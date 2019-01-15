import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import geohash from 'ngeohash';
import ReactMapGL, { Marker } from 'react-map-gl';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pin from '../UserMap/pin';
import mapboxConfig from '../../Mapbox/config';
import { locate_user, on_viewport_change } from '../../actions';
import { CircularProgress } from '@material-ui/core';
import {defaultMapStyle} from '../UserMap/mapstyle';

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
    constructor(){
        super();
        this.state = {
            loading: false,
            mapStyle: defaultMapStyle
        }
    }

    componentDidMount(){
        this.watchID=null
    }

    componentWillUnmount(){
        if(this.watchID!==null){
            navigator.geolocation.clearWatch(this.watchID)
            console.log("logger stopped!");
            this.setState({
                loading:false
            })
        }    
    }

    handleClick = () => {
        const {locate_user} = this.props;
        locate_user();
        console.log(this.watchID)
    }

    // ここアロー関数じゃないとthisの参照がundefinedとなるので注意
    handleGo = () => {
        this.setState({
            loading:true
        })

        const db = firebase.firestore()
        firebase.auth().onAuthStateChanged(user =>{
            // ステータスを待機中に更新
            db.collection("users").doc(user.uid).set({
                waiting: true
            }, {merge:true})
            .then(()=>{
                console.log(user.uid, 'を待機中に変更したよ')
            })
            .catch(err=>{
                console.log(`エラー${err}が発生した`)
            })
        })
        
        this.watchID = navigator.geolocation.watchPosition(
            // 位置情報取得成功
            pos=> {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                const heading = pos.coords.heading;
                const firebaseGeopoint = new firebase.firestore.GeoPoint(latitude, longitude);
                console.log(latitude, longitude);
                firebase.auth().onAuthStateChanged(user =>{
                    // 位置情報の格納
                    db.collection("locations").add({
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: user.uid,
                        geohash: geohash.encode(latitude, longitude),
                        geopoint: firebaseGeopoint,
                        heading: heading
                    })
                    .then(docRef => {
                        console.log(`位置情報を格納完了${docRef.id}`)
                    });
                })
            },
            // 位置情報取得失敗
            err => {
                console.log(err)
                this.setState({
                    loading:false
                })
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
            // 位置情報の取得をストップ
            navigator.geolocation.clearWatch(this.watchID)
            console.log("logger stopped!");
            this.setState({
                loading:false
            })

            // ステータスを非待機中にする
            const db = firebase.firestore()

            firebase.auth().onAuthStateChanged(user =>{
                db.collection("users").doc(user.uid).set({
                    waiting: false
                }, {merge:true})
                .then(()=>{
                    console.log(user.uid, 'を待機中じゃなく変更したよ')
                })
                .catch(err=>{
                    console.log(`エラー${err}が発生した`)
                })
            })
        } else {
            console.log("まだロガー起動してないよ")
        }
    }

    render() {
        const { classes, on_viewport_change, map, auth } = this.props;
        return(
            <div>
                <ReactMapGL
                    {...map.viewport}
                    width="100%"
                    mapStyle={this.state.mapStyle}
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
                    {this.state.loading?<CircularProgress className={classes.button} size={30} />:<Button disabled={auth.user===null} className={classes.button} variant="outlined" color="primary" onClick={this.handleGo}>Go!</Button>}
                    <Button disabled={auth.user===null||!this.state.loading} className={classes.button} variant="outlined" color="secondary" onClick={this.handleStop}>Stop!</Button>
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