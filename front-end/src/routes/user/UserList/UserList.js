import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { pick } from 'lodash';
import { FaUserPlus, FaUserEdit, FaTrash } from 'react-icons/fa';
import { getUsers, deleteUser } from '../../../redux/modules/user';
import { ucFirst } from '../../../helpers';
import { usersListSelector, usersParamsSelector, profileSelector } from '../../../redux/selectors';
import confirm from '../../../components/ConfirmModal';
import Pagination from '../../../components/Pagination';

class UsersList extends Component {
  static propTypes = {
    deleteUser: PropTypes.func,
    getUsers: PropTypes.func,
    usersList: PropTypes.array,
    profile: PropTypes.object,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { getUsers, params } = this.props;
    getUsers({ params });
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props;
    confirm('Do you really want to delete this use?')
      .then(() => {
        deleteUser({ id });
      }
    )
  }

  handlePagination = (pagination) => {
    const { getUsers, params } = this.props
    getUsers({
      params: {
        ...pick(params, ['page', 'page_size']),
        ...pagination
      }
    })
  }

  render() {
    const { usersList, params, profile } = this.props;
    const pagination = pick(params, ['page', 'page_size', 'count']);

    return (
      <div>
        <h2 className='text-center mb-5'>Manage Users</h2>
        <div className='text-right mb-2'>
          <Link to='/users/new' className='btn btn-primary'>
            <FaUserPlus size='1.5em' />
          </Link>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{ucFirst(user.role)}</td>
                <td className='text-right'>
                  {' '}
                  <Button color='primary' tag={Link} size='sm' to={`/users/edit/${user._id}`}>
                    <FaUserEdit />
                  </Button>
                  {' '}
                  {profile._id !== user._id ? (<Button color='danger' size='sm' onClick={this.handleDeleteUser(user._id)}>
                    <FaTrash />
                  </Button>) : (<Button color='danger' style={{ visibility: 'hidden' }} size='sm'>
                    <FaTrash />
                  </Button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  usersList: usersListSelector,
  params: usersParamsSelector,
  profile: profileSelector
})

const actions = {
  getUsers,
  deleteUser
}

export default compose(
  connect(selector, actions),
  withRouter
)(UsersList)
