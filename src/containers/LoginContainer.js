import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';

import LoginPresenter from "components/login/LoginPresenter";

class LoginContainer extends Component {

    async componentDidMount() {
        const { LoginActions, logged } = this.props;
        await LoginActions.initialize();
        if(logged === false) {
            LoginActions.getRequestToken();
        }
    }

    updateUsername = (event) => {
        const { LoginActions } = this.props;
        const { value } = event.target; 
        LoginActions.changeUsername({value});
    }

    updatePassword = (event) => {
        const { LoginActions } = this.props;
        const { value } = event.target; 
        LoginActions.changePassword({value});
    }

    enterSubmit = (event) => {
        if(event.keyCode === 13){
            this.handleSubmit(event);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.props;
        if(username !== "" && password !== "") {
            this.validateWithLogin();
        }
    };

    validateWithLogin = async () => {
        const { username, password, LoginActions } = this.props;
        try {	
            localStorage.setItem('username', username);
            let request_token = localStorage.getItem('token');
            await LoginActions.validateWithLogin({username, password, request_token});	
        } catch (e) { 	
            console.log(e);	
        }	
    };

    render() {
        const { username, password, loading } = this.props;
        
        return(
            <LoginPresenter 
                username={username}
                password={password}
                loading={loading}
                handleSubmit={this.handleSubmit}
                updateUsername={this.updateUsername}
                updatePassword={this.updatePassword}
                enterSubmit={this.enterSubmit}
            />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        username: state.login.get('username'),
        password: state.login.get('password'),
        request_token: state.login.get('request_token'),
        logged: state.login.get('logged'),
        loading: state.pender.pending['login/GET_REQUEST_TOKEN'] 
              || state.pender.pending['login/VALIDATE_WITH_LOGIN']
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(LoginContainer));