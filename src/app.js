
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store from './redux/store';
import Home from './page/home';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}


ReactDOM.render((
  <LocaleProvider locale={zhCN}>
    <App />
  </LocaleProvider>
), document.getElementById('App'));
