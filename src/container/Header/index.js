import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as Account_actions from '../../actions';
import history from '../../Route/history';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 200,
      },
};

function ListItemLink(props) {
    const { primary, to } = props;
    return (
      <li>
        <ListItem button component={Link} to={to}>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

class ButtonAppBar extends React.Component {
    
    state = {
        anchorEl: null,
        drawer: false,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleToProfile = () => {
        history.push('/profile')
    }

    handleToLoginPage = () => {
        // console.log("ログインボタンが押された！");
        history.push('/login')
    }

    handleToLogout = () => {
        // console.log("ログアウトボタンが押された！");
        this.props.actions.logoutUser()
        history.push('/')
    }

    handleToHome = () => {
        history.push('/')
    }

    toggleDrawer = open => () => {
        this.setState({
          drawer: open,
        });
      };

    render() {
        const { classes, user } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItemLink to='/login' primary='ログイン' />
                </List>
                <Divider />
                <List>
                    <ListItemLink to='/welcome' primary='ウェルカム' />
                    <ListItemLink to='/map' primary='地図' />
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <SwipeableDrawer
                            open={this.state.drawer}
                            onClose={this.toggleDrawer(false)}
                            onOpen={this.toggleDrawer(true)}
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer(false)}
                                onKeyDown={this.toggleDrawer(false)}
                            >
                                {sideList}
                            </div>
                        </SwipeableDrawer>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.grow}
                            onClick={this.handleToHome}
                        >
                            Ubivis
                        </Typography>
                        {!user ? (
                        <Button
                            color="inherit"
                            onClick={this.handleToLoginPage}
                        >
                            ログイン
                        </Button>
                        ): (
                        <div>
                            <IconButton
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={this.handleToProfile}>プロフィール</MenuItem>
                            <MenuItem onClick={this.handleToLogout}>ログアウト</MenuItem>
                            </Menu>
                        </div>
                        )}
                        
                    </Toolbar>
                </AppBar>
            </div>
    );}
}

const mapStateToProps = state => {
    return state.auth;
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Account_actions, dispatch),
    };
};

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps )(
    withStyles(styles)(ButtonAppBar)
);