import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from 'store/modules/login';

import Header from "components/common/Header";

class HeaderContainer extends Component {

    async componentDidMount() {
        const { LoginActions } = this.props;
        let logged = localStorage.getItem('logged')
        let token = localStorage.getItem('token');
        let sessionId = localStorage.getItem('session_id');
        try {
            if(logged && !sessionId) {
                LoginActions.createSessionId(token);
            }
        } catch(e) {
            console.log(e);
        }
    }

    render() {

        return(
           <Header />
        );
    }
}

export default withRouter(connect(
    (state) => ({
        session_id: state.login.get('session_id'),
        logged: state.login.get('logged'),
        loading: state.pender.pending['login/GET_REQUEST_TOKEN'] || state.pender.pending['login/VALIDATE_WITH_LOGIN'] || state.pender.pending['login/CREATE_SESSION_ID'],
    }),
    (dispatch) => ({
        LoginActions: bindActionCreators(loginActions, dispatch)
    })
)(HeaderContainer));