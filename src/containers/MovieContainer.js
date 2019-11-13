import React, { Component } from 'react';
import Helmet from "react-helmet";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as movieActions from 'store/modules/movie';

import MoviePresenter from "components/movie/MoviePresenter";
import Loader from 'components/common/Loader';

class MovieContainer extends Component {
    
    componentDidMount() {
        const { MovieActions } = this.props;
        MovieActions.getMovieNowplaying();
        MovieActions.getMovieUpcoming();
        MovieActions.getMoviePopular();
    }

    render() {
        const { nowPlaying, upcoming, popular, loading } = this.props;
        return (
            <>
            <Helmet>
                <title>Movies | REMOVIE</title>
            </Helmet>
            {loading 
                ? (<Loader />) 
                : <MoviePresenter 
                    nowPlaying={nowPlaying}
                    upcoming={upcoming}
                    popular={popular}
                  />
            }
            </>
        );
    }
}

export default connect(
    (state) => ({
        nowPlaying: state.movie.get('nowPlaying'),
        upcoming: state.movie.get('upcoming'),
        popular: state.movie.get('popular'),
        loading: state.pender.pending['movie/GET_MOVIE_NOWPLAYING'] 
              || state.pender.pending['movie/GET_MOVIE_UPCOMING'] 
              || state.pender.pending['movie/GET_MOVIE_POPULAR'],
    }),
    (dispatch) => ({
        MovieActions: bindActionCreators(movieActions, dispatch)
    })
)(MovieContainer);