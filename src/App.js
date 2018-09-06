import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from './common/header';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail/loadable';
import Login from  './pages/login';
import Write from './pages/write';

//route 带参数1.动态路由（匹配： this.props.match.params.参数名）2.路径参数（this.props.location.参数名）
class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <div>
              <Header />
              <Route path="/" exact component={ Home }></Route>
              <Route path="/login" exact component={ Login }></Route>
              <Route path="/write" exact component={ Write }></Route>
              <Route path="/detail/:id"  exact component={ Detail }></Route>
            </div>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
