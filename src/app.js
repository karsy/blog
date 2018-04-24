
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import store from './redux/store';
import Home from './page/home';
import Guide from './page/guide';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />

            <Route path="/guide/:id" component={Guide} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('App'));
