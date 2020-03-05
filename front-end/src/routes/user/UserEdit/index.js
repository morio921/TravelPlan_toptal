import UserEdit from './UserEdit';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import {
  createUser,
  getUser,
  updateUser
} from '../../../redux/actions/user';
import * as selectors from '../../../redux/selectors';

UserEdit.propTypes = {
  createUser: PropTypes.func,
  getUser: PropTypes.func,
  history: PropTypes.object,
  updateUser: PropTypes.func,
  userState: PropTypes.object,
  auth: PropTypes.object,
};

const selector = createStructuredSelector({
  userState: selectors.userStateSelector,
  auth: selectors.profileSelector
});

const actions = {
  createUser,
  getUser,
  updateUser
};

export default compose(
  connect(selector, actions),
  withRouter
)(UserEdit);
