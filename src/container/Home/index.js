import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import headImage from './header.jpg';
import logo from "./logo.png";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 5,
    paddingLeft: theme.spacing.unit ,
    paddingRight: theme.spacing.unit
  },
  img: {
    width: "100%",
    [theme.breakpoints.down('md')]:{
      maxHeight: 200,
    },
    [theme.breakpoints.up('md')]:{
      maxHeight: 400,
    },
    objectFit: 'cover',
    objectPosition: '0% 0%'
  },
  button: {
      marginTop: theme.spacing.unit * 3,
  },
  signInButton: {
    marginTop: theme.spacing.unit * 5,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    width: 200,
    padding: '0 30px',
  },
  phoneSignInButton: {
    marginTop: theme.spacing.unit *2,    
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    width:200,
    padding: '0 30px',
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 4}px 0`,
    marginLeft: theme.spacing.unit*2,
    marginRight: theme.spacing.unit*2
  },
  logo:{
    height: 40
  }
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
      <div>
        <div>
          <img className={classes.img} src={headImage} alt="" />
        </div>
        <div className={classes.root}>
          <Dialog open={open} onClose={this.handleClose}>
            <DialogTitle>大方は完成してます</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  <div><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>ログインページ</Link>や
                  <Link to='/welcome' style={{ textDecoration: 'none', color: 'black' }}>ウェルカム画面</Link>、<Link to='/map' style={{ textDecoration: 'none', color: 'black' }}>地図</Link>などにとんでみてください.</div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleClose}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Typography color='primary' variant="h6" gutterBottom>
            いまから会えるマッチングアプリ
          </Typography>
          <Typography variant="caption" gutterBottom>
            イイネ、メッセージ一切不要
          </Typography>
          <Fab variant="extended" className={classes.signInButton} onClick={this.handleClick}>
            メールで登録
          </Fab>
          <Fab variant="extended" className={classes.phoneSignInButton} onClick={this.handleClick}>
            電話番号で登録
          </Fab>
        </div>
        <footer className={classes.footer}>
          <img className={classes.logo} src={logo} alt="logo" />
        </footer>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
