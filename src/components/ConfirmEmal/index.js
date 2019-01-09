import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit ,
    paddingRight: theme.spacing.unit
  },
  button: {
      marginTop: theme.spacing.unit * 3,
  },
});

class ConfirmEmail extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          登録ありがとうございます！
        </Typography>
        <Typography className={classes.button} variant="body1" gutterBottom>
          メールアドレスの確認をお願いいたします。
        </Typography>
      </div>
    );
  }
}

ConfirmEmail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmEmail);
