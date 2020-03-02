import React, { Component } from 'react';
import {
  Button,
  Table,
  UncontrolledTooltip
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { pick } from 'lodash';
import {
  FaUserPlus,
  FaUserEdit,
  FaTrash
} from 'react-icons/fa';
import { ucFirst } from '../../../helpers';
import { isAdmin } from '../../../helpers/roleHelpers';
import confirm from '../../../components/ConfirmModal';
import Pagination from '../../../components/Pagination';

class UserList extends Component {
  componentDidMount() {
    const { getUsers, params } = this.props;
    getUsers({ params });
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser, getUsers, params } = this.props;
    confirm('Are you sure to delete this user?')
      .then(() => {
        deleteUser({
          id,
          success: () => getUsers({
            params: {
              count: params.count,
              page: 1,
              page_size: params.page_size
            }
          })
        });
      }
    )
  }

  handlePagination = (pagination) => {
    const { getUsers, params } = this.props;
    getUsers({
      params: {
        ...pick(params, ['page', 'page_size']),
        ...pagination
      }
    });
  }

  render() {
    const { usersList, params, profile } = this.props;
    const pagination = pick(params, ['page', 'page_size', 'count']);

    return (
      <div>
        <h2 className='text-center mb-5'>All Users</h2>
        <div className='text-right mb-2'>
          <Link to='/users/new' className='btn btn-primary'>
            <FaUserPlus size='1.2em' /> Add User
          </Link>
        </div>
        <Table striped responsive>
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
                  {(isAdmin(user) || profile._id === user._id) ? (<Button color='danger' style={{ visibility: 'hidden' }} size='sm'>
                    <FaUserEdit />
                  </Button>)
                  : (<>
                    <Button id='editButton' color='primary' tag={Link} size='sm' to={`/users/edit/${user._id}`}>
                      <FaUserEdit />
                    </Button>
                    <UncontrolledTooltip placement='top' target='editButton'>
                      Edit
                    </UncontrolledTooltip>
                  </>
                  )}
                  {' '}
                  {(isAdmin(user) || profile._id === user._id) ? (<Button color='danger' style={{ visibility: 'hidden' }} size='sm'>
                      <FaTrash />
                    </Button>)
                  : (<>
                    <Button id='deleteButton' color='danger' size='sm' onClick={this.handleDeleteUser(user._id)}>
                      <FaTrash />
                    </Button>
                    <UncontrolledTooltip placement='top' target='deleteButton'>
                      Delete
                    </UncontrolledTooltip>
                  </>
                  )}
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

export default UserList;
