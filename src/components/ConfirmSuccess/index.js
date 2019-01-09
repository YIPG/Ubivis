import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
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
          メールアドレスの確認ができました
        </Typography>
        <Button className={classes.button} color="primary" variant="outlined" component={Link} to="/welcome">
          設定をしましょう！
        </Button>
      </div>
    );
  }
}

ConfirmEmail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmEmail);
