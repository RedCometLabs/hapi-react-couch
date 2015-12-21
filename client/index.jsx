import React from 'react';
import ReactDOM from 'react-dom';

/* React Router */
import {Router, Route} from 'react-router';
import history from './utils/history'

/* Redux */
import {createStore, applyMiddleware} from 'redux';
import reducer from './redux/reducers/reducer';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

/* Spectre Components */
import {AppContainer} from './components/App';
import {HomeContainer} from './components/Home';
import {AccountContainer} from './components/Account';

/* Auth Components */
import Login from './components/auth/Login';
import Forgot from './components/auth/Forgot';
import Register from './components/auth/Register';
import Reset from './components/auth/Reset';

/* Redux store created with middleware to enable aync actions */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

/* Routes */
const routes = <Route component={AppContainer}>
  <Route path="/" component={HomeContainer}/>
  <Route path="account" component={AccountContainer}/>
  <Route path="login" component={Login}/>
  <Route path="register" component={Register}/>
  <Route path="forgot" component={Forgot}/>
  <Route path="reset/:resetToken/:userEmail" component={Reset}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app-container')
);
