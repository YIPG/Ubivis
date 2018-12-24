import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    emailChanged,
    passwordChanged,
    loginUser
} from '../../actions';

const styles = theme => ({
    progress : {
        marginTop: theme.spacing.unit * 4
    },
    button : {
        marginTop: theme.spacing.unit * 4
    },
    textform: {
        margin: theme.spacing.unit 
    }
})

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text.target.value);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text.target.value);
    }

    onButtonPress() {
        const { email, password} = this.props;
        this.props.loginUser({ email, password });
    }

    onKeyDown(e){
        if(e.key === 'Enter') this.onButtonPress()
    }

    renderButton() {
        
        if (this.props.loading) {
            return <CircularProgress size={30} className={this.props.classes.progress} color='secondary' />;
        }

        return (
            <Button
                className={this.props.classes.button}
                variant='contained'
                color='primary'
                onClick={this.onButtonPress.bind(this)}
            >
                ログインまたは新規登録
            </Button>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction='column'
                alignItems='center'
            >
                <TextField
                    className={classes.textform}
                    label='メールアドレス'
                    onChange= {this.onEmailChange.bind(this)}
                    value={this.props.email}
                    autoFocus
                />
                <TextField
                    className={classes.textform}
                    label='パスワード'
                    type='password'
                    onChange={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    onKeyDown={this.onKeyDown.bind(this)}
                />
                {this.renderButton()}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    // console.log(state.auth)
    return state.auth;
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser
})(
    withStyles(styles)(LoginForm)
);
