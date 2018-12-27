import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 10,
      paddingLeft: theme.spacing.unit ,
      paddingRight: theme.spacing.unit
    }
  });

function Welcome(props){
    const {classes} = props;

    return (
        <div className={classes.root}>
            <Typography variant="h2" gutterBottom>
                Ubivisへようこそ！
            </Typography>
            <Typography variant="h5" gutterBottom>
                まずはプロフィールを設定しましょう！
            </Typography>
        </div>
    )
}

export default withStyles(styles)(Welcome);