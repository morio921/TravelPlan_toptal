import UserList from './UserList';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import {
  getUsers,
  deleteUser
} from '../../../redux/modules/user';
import {
  usersListSelector,
  usersParamsSelector,
  profileSelector
} from '../../../redux/selectors';

UserList.propTypes = {
  deleteUser: PropTypes.func,
  getUsers: PropTypes.func,
  usersList: PropTypes.array,
  profile: PropTypes.object,
};

const selector = createStructuredSelector({
  usersList: usersListSelector,
  params: usersParamsSelector,
  profile: profileSelector
});

const actions = {
  getUsers,
  deleteUser
};

export default compose(
  connect(selector, actions),
  withRouter
)(UserList);
