import React from 'react';
import ReactDOM from 'react-dom';

/* React Router */
import {Router, Route} from 'react-router';
import history from './utils/history';

/* Redux */
import {createStore, applyMiddleware} from 'redux';
import reducers from './redux/reducers/index';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

/* bookEU Components */
import {AppContainer} from './components/App';
import HomeContainer from './components/Home';
//import AccountPageContainer from './components/AccountPage';

/* Auth Components */
import {ResetContainer} from './components/auth/ResetPage';
import VerifyContainer from './components/auth/VerifyContainer';
import LoginContainer from './components/auth/LoginPage';
import ForgotContainer from './components/auth/ForgotPage';

/* Redux store created with middleware to enable aync actions */
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

/* Routes */
const routes = (
  <Route component={AppContainer}>

    <Route path="/" component={HomeContainer}/>
    <Route path="reset/:resetToken/:userEmail" component={ResetContainer}/>
    <Route path="login" component={LoginContainer}/>
    <Route path="forgot" component={ForgotContainer}/>
    <Route path="verify/:verificationToken/:userEmail" component={VerifyContainer}/>
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.getElementById('app-container')
);
