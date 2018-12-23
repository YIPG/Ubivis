import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  button: {
      marginTop: theme.spacing.unit * 3,
  },
});

class Home extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>インフラ周りは完成してます</DialogTitle>
          <DialogContent>
            <DialogContentText>
                <div><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>ログインページ</Link>や<Link to='/welcome' style={{ textDecoration: 'none', color: 'black' }}>ウェルカム画面</Link>にとんでみてください.</div>
                <div>(現在は無効にしています)</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          ただいまメイン機能実装中です
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          comming soon
        </Typography>
        <Button className={classes.button} variant="outlined" color="secondary" onClick={this.handleClick}>
          実は...
        </Button>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
