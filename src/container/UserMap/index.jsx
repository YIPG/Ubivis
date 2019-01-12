import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import geohash from 'ngeohash';
import ReactMapGL, { Marker } from 'react-map-gl';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pin from './pin';
import mapboxConfig from '../../Mapbox/config';
import { locate_user, on_viewport_change } from '../../actions/UserMapActions';

const styles = theme => ({
    buttonWrap: {
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing.unit * 2,
    }
})

class UserMapContent extends React.Component {
    componentDidMount(){
        this.watchID=null
    }

    componentWillUnmount(){
        if(this.watchID!==null){
            navigator.geolocation.clearWatch(this.watchID)
            console.log("logger stopped!");
        }
    }

    handleClick = () => {
        const {locate_user} = this.props;
        locate_user();
        console.log(this.watchID)
    }

    // ここアロー関数じゃないとthisの参照がundefinedとなるので注意
    handleGo = () => {
        const db = firebase.firestore()
        this.watchID = navigator.geolocation.watchPosition(
            // 位置情報取得成功
            pos=> {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                console.log(latitude, longitude);
                firebase.auth().onAuthStateChanged(user =>{
                    db.collection("locations").add({
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: user.uid,
                        geohash: geohash.encode(latitude, longitude),
                        geopoint: new firebase.firestore.GeoPoint(latitude, longitude)
                    })
                    .then(docRef => {
                        console.log(`位置情報を格納完了${docRef.id}`)
                    });
                })
            },
            // 位置情報取得失敗
            err => {
                console.log(err)
            },
            // オプション
            {
                enableHighAccuracy: true,
                timeout: 30000,
            }
        )
    }

    handleStop =() => {
        if(this.watchID!==null){
            navigator.geolocation.clearWatch(this.watchID)
            console.log("logger stopped!");
        } else {
            console.log("まだロガー起動してないよ")
        }
    }

    render() {
        const { classes, on_viewport_change, map } = this.props;
        return(
            <div>
                <ReactMapGL
                    {...map.viewport}
                    width="100%"
                    onViewportChange={(viewport) => on_viewport_change({viewport})}
                    mapboxApiAccessToken={mapboxConfig}
                >
                    <Marker
                        latitude={map.marker.latitude}
                        longitude={map.marker.longitude}    
                    >
                        <Pin size={20} />
                    </Marker>
                </ReactMapGL>
                <div className={classes.buttonWrap}>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.handleClick}>現在地を取得</Button>
                    <Button className={classes.button} variant="outlined" color="primary" onClick={this.handleGo}>Go!</Button>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.handleStop}>Stop!</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
  };
  
export default connect(mapStateToProps, { 
    locate_user,
    on_viewport_change
})(
    withStyles(styles)(UserMapContent)
);