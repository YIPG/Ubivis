import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    emailChanged,
    passwordChanged,
    loginUser
} from '../../actions';

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

    renderButton() {
        if (this.props.loading) {
            return <CircularProgress />;
        }

        return (
            <Button
                style={{ marginTop: 20 }}
                variant='contained'
                color='primary'
                onClick={this.onButtonPress.bind(this)}
            >
                送信
            </Button>
        );
    }

    render() {
        return (
            <Grid
                container
                direction='column'
                alignItems='center'
            >
                <TextField
                    label='メールアドレス'
                    onChange= {
                        this.onEmailChange.bind(this)
                    }
                    value={this.props.email}
                    autoFocus
                />
                <TextField
                    label='パスワード'
                    type='password'
                    onChange={this.onPasswordChange.bind(this)}
                    value={this.props.password}
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
    LoginForm
);
