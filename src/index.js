import React from "react";
import ReactDOM from "react-dom";
import {
  Router as HashRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import createHistory from "history/createHashHistory";
const history = createHistory();
import HomePage from "./pages/Home";

import UserListPage from "./pages/UserList";
import UserAddPage from "./pages/UserAdd";
import UserEditPage from "./pages/UserEdit";

import BookListPage from "./pages/BookList";
import BookAddPage from "./pages/BookAdd";
import BookEditPage from "./pages/BookEdit";

import LoginPage from "./pages/login";
import HomeLayout from "./layouts/HomeLayout";

ReactDOM.render(
  <HashRouter history={history}>
    <div>
      <HomeLayout>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/user/add" component={UserAddPage} />
        <Route path="/user/list" component={UserListPage} />
        <Route path="/user/edit/:id" component={UserEditPage} />
        <Route path="/book/list" component={BookListPage} />
        <Route path="/book/add" component={BookAddPage} />
        <Route path="/book/edit/:id" component={BookEditPage} />
      </HomeLayout>
    </div>
  </HashRouter>,
  document.getElementById("app")
);
