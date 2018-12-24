import React from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker } from 'react-map-gl';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Pin from './pin';
import mapboxConfig from '../../Mapbox/config';
import { locate_user, on_viewport_change } from '../../actions/UserMapActions';

const styles = theme => ({
    buttonWrap: {
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing.unit,
    }
})

class UserMapContent extends React.Component {
    handleClick = () => {
        const {locate_user} = this.props;
        locate_user();
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