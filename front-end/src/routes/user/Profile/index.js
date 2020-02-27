import Profile from './Profile';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { updateUser } from '../../../redux/modules/user';
import { signout } from '../../../redux/modules/auth';
import * as selectors from '../../../redux/selectors';

Profile.propTypes = {
  profile: PropTypes.object,
  updateUser: PropTypes.func,
};

const selector = createStructuredSelector({
  profile: selectors.profileSelector,
});

const actions = {
  updateUser,
  signout
};

export default compose(
  connect(selector, actions),
  withRouter
)(Profile);
