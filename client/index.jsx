import ReactDOM from 'react-dom';
import React from 'react';

/* React Router */
import {Router, Route} from 'react-router';

/* Redux */
import {createStore, applyMiddleware} from 'redux';
import reducer from './redux/reducers/reducer';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

/* Spectre Components */
import {AppContainer} from './components/App';
import Home from './components/Home';
import Account from './components/Account';
import Secret from './components/Secret';

/* Redux store created with middleware to enable aync actions */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

/* Routes */
const routes = <Route component={AppContainer}>
  <Route path="/" component={Home}/>
  <Route path="/account" component={Account}/>
  <Route path="/secret" component={Secret}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app-container')
);
