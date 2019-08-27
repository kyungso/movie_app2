import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Home from "../Routes/Home/index";
import Movie from "../Routes/Movie/index";
import TV from "../Routes/TV/index";
import Search from "../Routes/Search/index";
import Detail from "../Routes/Detail/index"
import Header from "./Header";

export default () => (
  <Router>
    <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movie" exact component={Movie} />
          <Route path="/tv" exact component={TV} />
          <Route path="/search" exact component={Search} />
          <Route path="/movie/:id" component={Detail} />
          <Route path="/show/:id" component={Detail} />
          <Redirect from="*" to="/" />
        </Switch>
    </>
  </Router>
);
