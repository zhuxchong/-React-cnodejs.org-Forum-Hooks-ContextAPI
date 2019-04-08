import React, { Component } from "react";
import ShowList from "./container/listShow";
import UserDetail from "./container/userDetails";
import ArticalDetail from "./container/articalDetail";
import Login from "./container/login";
import Header from "./container/header";
import List from "./component/postList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalState from "./store/GlobalState";

import "./App.css";

class App extends Component {
  render() {
    return (
      <GlobalState>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={ShowList} />\
            <Route path="/login" component={Login} />
            <Route path="/user/:name" component={UserDetail} />
            <Route path="/artical/:id" component={ArticalDetail} />
          </Switch>
        </BrowserRouter>
      </GlobalState>
    );
  }
}

export default App;
