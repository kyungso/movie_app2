import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from 'store/modules/account';

import AccountPresenter from "components/account/AccountPresenter";
import Loader from "components/common/Loader";

class AccountContainer extends Component {

    async componentDidMount() {
        const { AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        try {
            if(sessionId) {
                AccountActions.getAccountDetail(sessionId);
            }
        } catch(e) {
            console.log(e);
        }
    }

    async componentDidUpdate(prevProps) {
        const { AccountActions, accountDetail } = this.props;

        let sessionId = localStorage.getItem('session_id');
        let accountId = localStorage.getItem('accountId');
    
        if(accountDetail !== prevProps.accountDetail) {
            if(sessionId) {
                AccountActions.getFavoriteMovies(accountId, sessionId);
                AccountActions.getFavoriteTV(accountId, sessionId);
                AccountActions.getRatedMovies(accountId, sessionId);
                AccountActions.getRatedTV(accountId, sessionId);
                AccountActions.getGenreList();
            }
        }
    }

    handleFavoriteBtn = (media_id) => {
        const { location: { pathname }, AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        let accountId = localStorage.getItem('accountId');
        let isTV = pathname.includes("/tv");
        let media_type = isTV ? 'tv' : 'movie';
        let favorite = false;
        AccountActions.markAsFavorite(accountId, sessionId, {media_type, media_id, favorite});
    }

    handleClearRating = (id) => {
        const { location: { pathname }, AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        let isTV = pathname.includes("/tv");

        if(isTV) {
            AccountActions.deleteRatingTV(id, sessionId);
        } else  {
            AccountActions.deleteRatingMovies(id, sessionId);
        }
    }

    handleRating = (id, rate) => {
        const { location: { pathname }, AccountActions } = this.props;
        let sessionId = localStorage.getItem('session_id');
        let isTV = pathname.includes("/tv");

        if(isTV) {
            AccountActions.postRatingTV(id, rate, sessionId);
            AccountActions.editRatedTV({id, rate});
        } else  {
            AccountActions.postRatingMovies(id, rate, sessionId);
            AccountActions.editRatedMovies({id, rate});
        }
    }

    render() {
        const { accountDetail, favoriteMovies, favoriteTV, ratedMovies, ratedTV, genreList, loading } = this.props;
        return(
           <>
           {loading
            ? <Loader />
            : accountDetail && <AccountPresenter
                accountDetail={accountDetail}
                favoriteMovies={favoriteMovies}
                favoriteTV={favoriteTV}
                ratedMovies={ratedMovies}
                ratedTV={ratedTV}
                genreList={genreList}
                handleFavoriteBtn={this.handleFavoriteBtn}
                handleClearRating={this.handleClearRating}
                handleRating={this.handleRating}
                loading={loading}
              />
            }
           </>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        accountDetail: state.account.get('accountDetail'),
        favoriteMovies: state.account.get('favoriteMovies'),
        favoriteTV: state.account.get('favoriteTV'),
        ratedMovies: state.account.get('ratedMovies'),
        ratedTV: state.account.get('ratedTV'),
        genreList: state.account.get('genreList'),
        updateRating: state.account.get('updateRating'),
        loading: state.pender.pending['account/GET_ACCOUNT_DETAILS'] 
                || state.pender.pending['account/GET_FAVORITE_MOVIES'] 
                || state.pender.pending['account/GET_FAVORITE_TV'] 
                || state.pender.pending['account/GET_RATED_MOVIES'] 
                || state.pender.pending['account/GET_RATED_TV']
                || state.pender.pending['account/GET_GENRE_LIST']
                || state.pender.pending['account/DELETE_RATING_MOVIES']
                || state.pender.pending['account/DELETE_RATING_TV']
    }),
    (dispatch) => ({
        AccountActions: bindActionCreators(accountActions, dispatch)
    })
)(AccountContainer));