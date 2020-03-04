import React, { Component } from 'react';
import {
  Button,
  Table,
  UncontrolledTooltip
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { pick } from 'lodash';
import {
  FaRegEdit,
  FaRegTrashAlt
} from 'react-icons/fa';
import { isAdmin } from '../../helpers/roleHelpers';
import confirm from '../../components/ConfirmModal';
import Pagination from '../../components/Pagination';
import moment from 'moment';

class Dashboard extends Component {
  componentDidMount() {
    const { getFutureRecords, params } = this.props;
    getFutureRecords({ params });
  }

  handleDeleteRecord = (id) => () => {
    const { deleteRecord, getFutureRecords, params } = this.props;
    confirm('Are you sure to delete the record?')
      .then(() => {
        deleteRecord({
          id,
          success: () => getFutureRecords({ params })
        });
      }
    );
  }

  handlePagination = (pagination) => {
    const { getFutureRecords, params } = this.props;
    getFutureRecords({
      params: {
        ...pick(params, ['page', 'page_size']),
        ...pagination
      }
    });
  }

  displayDayCount = (startDate) => {
    if(moment(new Date()).isBefore(startDate))
      return moment(startDate).fromNow();
  }

  render() {
    const { params, profile, recordsList } = this.props;
    const pagination = pick(params, ['page', 'page_size', 'count']);

    return (
      <div>
        <h2 className='text-center mb-5'>Next Month Travel Records</h2>
        <Table striped responsive className='record-table'>
          <thead>
            <tr>
              <th className='text-center'>No</th>
              {isAdmin(profile) && <th className='text-center'>User</th>}
              <th className='text-center'>Destination</th>
              <th className='text-center'>Start Date</th>
              <th className='text-center'>End Date</th>
              <th className='text-center'>Comment</th>
              <th className='text-center'>After Days</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordsList.map((record, index) => (
              <tr key={index}>
                <th className='text-center' scope='row'>{index + 1}</th>
                {isAdmin(profile) && <td className='text-center'>{record.userName}</td>}
                <td className='text-center'>{record.destination}</td>
                <td className='text-center'>{moment(record.startDate).format('MM-DD-YYYY')}</td>
                <td className='text-center'>{moment(record.endDate).format('MM-DD-YYYY')}</td>
                <td className='text-center'>{record.comment}</td>
                <td className='text-center'>{this.displayDayCount(record.startDate)}</td>
                <td className='text-right'>
                  <Link id='editButton' className='btn btn-primary btn-sm' to={`/records/edit/${record._id}`}>
                    <FaRegEdit />
                  </Link>
                  <UncontrolledTooltip placement='top' target='editButton'>
                    Edit
                  </UncontrolledTooltip>
                  {' '}
                  <Button id='deleteButton' color='danger' size='sm' onClick={this.handleDeleteRecord(record._id)}>
                    <FaRegTrashAlt />
                  </Button>
                  <UncontrolledTooltip placement='top' target='deleteButton'>
                    Delete
                  </UncontrolledTooltip>
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

export default Dashboard;
