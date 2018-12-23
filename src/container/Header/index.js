import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as Account_actions from '../../actions';


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
};

class ButtonAppBar extends React.Component {
    
    state = {
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleToProfile = () => {
        this.props.history.push('/profile')
    }

    handleToLoginPage = () => {
            // console.log("ログインボタンが押された！");
            this.props.history.push('/login')
    }

    handleToLogout = () => {
        // console.log("ログアウトボタンが押された！");
        this.props.actions.logoutUser()
        this.props.history.push('/')
    }

    render() {
        const { classes, history, isLoggedIn, actions, user } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        

        const handleToHome = () => {
            history.push('/')
        }


        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.grow}
                            onClick={handleToHome}
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
    withRouter(withStyles(styles)(ButtonAppBar))
);