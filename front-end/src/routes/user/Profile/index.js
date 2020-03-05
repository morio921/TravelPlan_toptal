import Profile from './Profile';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { updateProfile, signout } from '../../../redux/actions/auth';
import * as selectors from '../../../redux/selectors';

Profile.propTypes = {
  auth: PropTypes.object,
  updateProfile: PropTypes.func,
};

const selector = createStructuredSelector({
  auth: selectors.authStateSelector,
});

const actions = {
  updateProfile,
  signout
};

export default compose(
  connect(selector, actions),
  withRouter
)(Profile);
