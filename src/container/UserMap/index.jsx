import React from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from "axios";
import {withStyles} from '@material-ui/core/styles';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Pin from './pin';
import mapboxConfig from '../../Mapbox/config';
import { locate_user, on_viewport_change, finishTargetTracking, changeViewport } from '../../actions';
import {defaultMapStyle, pointLayer} from './mapstyle';
import {fromJS} from "immutable";
import PolylineOverlay from './line';

const styles = theme => ({
    buttonWrap: {
        display:'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
})

class UserMapContent extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            mapStyle: defaultMapStyle,
            points:[],
            open: false,
            duration: null
        }
    }

    componentWillUnmount(){
        this.props.finishTargetTracking()        
    }

    handleClick = () => {
        const {locate_user} = this.props;
        locate_user();
    }

    // ここアロー関数じゃないとthisの参照がundefinedとなるので注意
    // handleGo = () => {
    //     this.setState({
    //         loading:true
    //     })

    //     const db = firebase.firestore()
    //     firebase.auth().onAuthStateChanged(user =>{
    //         // ステータスを待機中に更新
    //         db.collection("users").doc(user.uid).set({
    //             waiting: true
    //         }, {merge:true})
    //         .then(()=>{
    //             console.log(user.uid, 'を待機中に変更したよ')
    //         })
    //         .catch(err=>{
    //             console.log(`エラー${err}が発生した`)
    //         })
    //     })
        
    //     this.watchID = navigator.geolocation.watchPosition(
    //         // 位置情報取得成功
    //         pos=> {
    //             const latitude = pos.coords.latitude;
    //             const longitude = pos.coords.longitude;
    //             const heading = pos.coords.heading;
    //             const firebaseGeopoint = new firebase.firestore.GeoPoint(latitude, longitude);
    //             console.log(latitude, longitude);
    //             firebase.auth().onAuthStateChanged(user =>{
    //                 // 位置情報の格納
    //                 db.collection("locations").add({
    //                     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //                     uid: user.uid,
    //                     geohash: geohash.encode(latitude, longitude),
    //                     geopoint: firebaseGeopoint,
    //                     heading: heading
    //                 })
    //                 .then(docRef => {
    //                     console.log(`位置情報を格納完了${docRef.id}`)
    //                 });
    //             })
    //         },
    //         // 位置情報取得失敗
    //         err => {
    //             console.log(err)
    //             this.setState({
    //                 loading:false
    //             })
    //         },
    //         // オプション
    //         {
    //             enableHighAccuracy: true,
    //             timeout: 30000,
    //         }
    //     )
    // }

    // handleStop =() => {
    //     if(this.watchID!==null){
    //         // 位置情報の取得をストップ
    //         navigator.geolocation.clearWatch(this.watchID)
    //         console.log("logger stopped!");
    //         this.setState({
    //             loading:false
    //         })

    //         // ステータスを非待機中にする
    //         const db = firebase.firestore()

    //         firebase.auth().onAuthStateChanged(user =>{
    //             db.collection("users").doc(user.uid).set({
    //                 waiting: false
    //             }, {merge:true})
    //             .then(()=>{
    //                 console.log(user.uid, 'を待機中じゃなく変更したよ')
    //             })
    //             .catch(err=>{
    //                 console.log(`エラー${err}が発生した`)
    //             })
    //         })
    //     } else {
    //         console.log("まだロガー起動してないよ")
    //     }
    // }

    getRocket = () => {
        let {mapStyle} = this.state;
        let {latitude, longitude} = this.props.main;

        this.props.changeViewport(latitude, longitude, 13);

        if(!mapStyle.hasIn(['sources', 'drone'])) {
            mapStyle=mapStyle
                .setIn(['sources', 'drone'], fromJS({type: 'geojson'}))
                .set('layers', mapStyle.get('layers').push(pointLayer))
        }
        mapStyle = mapStyle.setIn(['sources', 'drone', 'data'], {
            type: 'Point',
            coordinates: [
              longitude,
              latitude
            ]
          })
        
          this.setState({mapStyle})
    }

    finishTracking= () => {
        this.props.finishTargetTracking()
    }

    getRoute = () => {
        const {latitude, longitude} = this.props.map.marker;

        this.props.changeViewport((latitude+this.props.main.latitude)/2, (longitude+this.props.main.longitude)/2, 11);

        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${this.props.main.longitude},${this.props.main.latitude};${longitude},${latitude}`, {
            params: {
                geometries: 'geojson',
                access_token: mapboxConfig
            }
        })
        .then(res => {
            this.setState({
                points: res.data.routes[0].geometry.coordinates,
                duration: res.data.routes[0].duration,
                open:true
            })
        })
        .catch(err => console.log(err))
    }

    // _renderPopup(){
    //     const {popupInfo, duration} = this.state;
    //     const {latitude, longitude} = this.props.map.marker;

    //     console.log(popupInfo, duration)

    //     return popupInfo && duration && (
    //         <Popup tipSize={4}
    //           anchor="top"
    //           longitude={longitude}
    //           latitude={latitude}
    //           closeOnClick={false}
    //           onClose={() => this.setState({popupInfo: false})} >
    //             <PopupText duration={duration} />
    //         </Popup>
    //       );
    // }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes, on_viewport_change, map } = this.props;
        return(
            <div>
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
                        {/* {this._renderPopup()} */}
                        <PolylineOverlay points={this.state.points} />
                    </ReactMapGL>
                </div>
                <div className={classes.buttonWrap}>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.handleClick}>現在地を取得</Button>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.getRocket}>ユーザー表示！</Button>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.getRoute}>ルート表示！</Button>
                    <Button className={classes.button} variant="outlined" color="secondary" onClick={this.finishTracking}>トラッキング終了</Button>
                </div>

                <SnackBar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }} 
                    open={this.state.open}
                    autoHideDuration={10000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">到着まであと{this.state.duration && Math.floor(this.state.duration / 60)}分です</span>}
                    action={[
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          className={classes.close}
                          onClick={this.handleClose}
                        >
                          <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
  };
  
export default connect(mapStateToProps, { 
    locate_user,
    on_viewport_change,
    finishTargetTracking,
    changeViewport
})(
    withStyles(styles)(UserMapContent)
);