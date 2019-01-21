import React, {PureComponent} from 'react';
import Typography from '@material-ui/core/Typography';

export default class PopupText extends PureComponent {
    render(){
        const {duration} = this.props;
        return(
            <div>
                <Typography variant='caption'>
                    到着まであと{duration}です
                </Typography>
            </div>
        )
    }
}