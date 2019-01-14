import {fromJS} from 'immutable';
import MAP_STYLE from '../../Mapbox/mapstyle-basic.json';

export const pointLayer = fromJS({
    "id": "drone",
    "type": "symbol",
    "source": "drone",
    "layout": {
        "icon-image": "car-15"
    }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
