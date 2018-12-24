const mapboxConfig = ((nodeEnv) => {
    if(nodeEnv === "production"){
        return process.env.REACT_APP_MAPBOX_PROD
    } else {
        return process.env.REACT_APP_MAPBOX_DEV
    }
}) (process.env.NODE_ENV);

export default mapboxConfig;