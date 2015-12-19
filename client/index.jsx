import React from 'react';
import ReactDOM from 'react-dom';

/* React Router */
import {Router, Route} from 'react-router';

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
import {LoginContainer} from './components/auth/Login';
import {ForgotContainer} from './components/auth/Forgot';
import {RegisterContainer} from './components/auth/Register';
import {ResetContainer} from './components/auth/Reset';

/* Redux store created with middleware to enable aync actions */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

/* Routes */
const routes = <Route component={AppContainer}>
  <Route path="/" component={HomeContainer}/>
  <Route path="account" component={AccountContainer}/>
  <Route path="login" component={LoginContainer}/>
  <Route path="register" component={RegisterContainer}/>
  <Route path="forgot" component={ForgotContainer}/>
  <Route path="reset/:resetToken/:userEmail" component={ResetContainer}/>
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app-container')
);
