import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Dashboard from './dashboard';
import Header from '../containers/Header';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Users from './user/Users';
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
  userIsAdminOrManagerRedir
} from '../helpers/authHelpers';
import '../styles/core.css';

const routes = ({ isAuthenticated }) => (
  <Router>
    <div>
      <Header />
      <Container className='main-content'>
        <Route exact path='/' render={() => (
          isAuthenticated ? (
            <Redirect to="/dashboard"/>
          ) : (
            <Redirect to="/signin"/>
          )
        )} />
        <Route path='/signin' component={userIsNotAuthenticatedRedir(Signin)} />
        <Route path='/signup' component={userIsNotAuthenticatedRedir(Signup)} />
        <Route path='/dashboard' component={userIsAuthenticatedRedir(Dashboard)} />
        <Route path='/users' component={userIsAuthenticatedRedir(
          userIsAdminOrManagerRedir(Users)
        )} />
      </Container>
    </div>
  </Router>
)

const selector = (state) => ({
  isAuthenticated: !!state.auth.me
})

export default connect(selector)(routes)
