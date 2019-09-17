import React, { Component } from 'react';
import Helmet from "react-helmet";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from 'store/modules/home';

import HomePresenter from "components/home/HomePresenter";
import Loader from "components/common/Loader";

class HomeContainer extends Component {
    getMovieTrending = () => {
        const { HomeActions } = this.props;
        HomeActions.getMovieTrending();
    }

    getTvTrending = () => {
        const { HomeActions } = this.props;
        HomeActions.getTvTrending();
    }

    getTopRated = () => {
        const { HomeActions } = this.props;
        HomeActions.getTopRated();
    }

    componentDidMount() {
        this.getMovieTrending();
        this.getTvTrending();
        this.getTopRated();
    }

    render() {
        const { movieTrending, tvTrending, topRated, loading } = this.props;
        return (
            <>
            <Helmet>
                <title>Home | Netflix</title>
            </Helmet>
            {loading 
                ? (<Loader />) 
                :   <HomePresenter 
                        movieTrending={movieTrending}
                        tvTrending={tvTrending}
                        topRated={topRated}
                    />
            }
            </>
        );
    }
}

export default connect(
    (state) => ({
        movieTrending: state.home.get('movieTrending'),
        tvTrending: state.home.get('tvTrending'),
        topRated: state.home.get('topRated'),
        loading: state.pender.pending['home/GET_MOVIE_TRENDING'] || state.pender.pending['home/GET_TV_TRENDING'] || state.pender.pending['home/GET_TOPRATED'],
    }),
    (dispatch) => ({
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(HomeContainer);