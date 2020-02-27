import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Table,
  Row,
  FormGroup,
  Input,
  Label,
  UncontrolledTooltip 
} from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaRegCalendarPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { pick } from 'lodash';
import { withRouter } from 'react-router';
import { getRecords, deleteRecord } from '../../../redux/modules/record';
import { recordsListSelector, recordsParamsSelector, profileSelector } from '../../../redux/selectors';
import { getDateStr } from '../../../helpers';
import { isAdmin } from '../../../helpers/roleHelpers';
import confirm from '../../../components/ConfirmModal';
import Pagination from '../../../components/Pagination';
import moment from 'moment';

const RecordFilterSchema = Yup.object().shape({
  userName: Yup.string(),
  fromDate: Yup.date(),
  toDate: Yup.date()
    .test('date-compare', 'End date must be later than state date', function(value) {
      if(this.parent.fromDate && value)
        return this.parent.fromDate <= value;
      return true;
    })
});

class RecordList extends Component {
  static propTypes = {
    deleteRecord: PropTypes.func,
    getRecords: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    pagination: PropTypes.object,
    recordsList: PropTypes.array,
    profile: PropTypes.object,
  };

  componentDidMount() {
    const { getRecords, params } = this.props;
    getRecords({ params });
  }

  handleDeleteRecord = (id) => () => {
    const { deleteRecord, getRecords, params } = this.props;
    confirm('Are you sure to delete the record?').then(
      () => {
        deleteRecord({
          id,
          success: () => getRecords({ params })
        })
      }
    )
  }
  
  handleFilter = (values) => {
    const { getRecords, params } = this.props;
    console.log("handleFilter", values);
    getRecords({
      params: {
        userName: values.userName,
        fromDate: getDateStr(values.fromDate),
        toDate: getDateStr(values.toDate),
        page: 1,
        page_size: params.page_size
      }
    })
  }

  handlePagination = (pagination) => {
    const { getRecords, params } = this.props;
    getRecords({
      params: {
        ...pick(params, ['userName', 'fromDate', 'toDate', 'page', 'page_size']),
        ...pagination
      }
    })
  }

  displayDayCount = (startDate) => {
    if(moment(new Date()).isBefore(startDate))
      return moment(startDate).fromNow();
  }

  render() {
    const { params, recordsList, profile } = this.props;
    const pagination = pick(params, ['page', 'page_size', 'count']);

    return (
      <div>
        <h2 className='text-center mb-5'>All Travel Records</h2>
        <Row className='text-right mb-3'>
          <Col md={10} xs={12}>
            <Formik
              initialValues = {{
                userName: '',
                fromDate: '',
                toDate: '',
              }}
              validationSchema={RecordFilterSchema}
              onSubmit={this.handleFilter}
            >
              {formik => (
                <Form inline onSubmit={formik.handleSubmit}>
                  {isAdmin(profile) && (<FormGroup className='form-group-style'>
                    <Label for='userName'>Name:</Label>
                    <Input
                      id='userName'
                      name='userName'
                      type='text'
                      value={formik.values.userName}
                      {...formik.getFieldProps('userName')}
                    />
                  </FormGroup>)}
                  <FormGroup className='form-group-style'>
                    <Label for="fromDate">From Date:</Label>
                    <Input
                      id='fromDate'
                      type='date'
                      name='fromDate'
                      value={formik.values.fromDate}
                      {...formik.getFieldProps('fromDate')}
                    />
                  </FormGroup>
                  <FormGroup className='form-group-style'>
                    <Label for="toDate">To Date:</Label>
                    <Input
                      id='toDate'
                      type='date'
                      name='toDate'
                      value={formik.values.toDate}
                      {...formik.getFieldProps('toDate')}
                    />
                    {formik.errors.toDate && formik.touched.toDate ? (
                        <div className='error-validation'>{formik.errors.toDate}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className='form-group-style'>
                    <Button type='submit' color='secondary'>Filter</Button>
                  </FormGroup>
                </Form>
              )}
            </Formik>
          </Col>
          <Col md={2} xs={12}>
            <Link to='/records/new' className='btn btn-primary'>
              <FaRegCalendarPlus size='1.2em' /> Add Record
            </Link>
          </Col>
        </Row>
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
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordsList ? (recordsList.map((record, index) => (
              <tr key={index}>
                <th className='text-center' scope='row'>{index + 1}</th>
                {isAdmin(profile) && <td className='text-center'>{record.userName}</td>}
                <td className='text-center'>{record.destination}</td>
                <td className='text-center'>{moment(record.startDate).format('MM-DD-YYYY')}</td>
                <td className='text-center'>{moment(record.endDate).format('MM-DD-YYYY')}</td>
                <td className='text-center'>{record.comment}</td>
                <td className='text-center'>{this.displayDayCount(record.startDate)}</td>
                <td className='text-center'>
                  <Link id='editButton' className='btn btn-primary btn-sm' to={`/records/edit/${record._id}`}>
                    <FaRegEdit />
                  </Link>
                  <UncontrolledTooltip placement='bottom' target='editButton'>
                    Edit
                  </UncontrolledTooltip>
                  {' '}
                  <Button id='deleteButton' color='danger' size='sm' onClick={this.handleDeleteRecord(record._id)}>
                    <FaRegTrashAlt />
                  </Button>
                  <UncontrolledTooltip placement='bottom' target='deleteButton'>
                    Delete
                  </UncontrolledTooltip>
                </td>
              </tr>
            ))) : <div>{'No Output Data'}</div>}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  recordsList: recordsListSelector,
  params: recordsParamsSelector,
  profile: profileSelector,
})

const actions = {
  getRecords,
  deleteRecord
}

export default compose(
  connect(selector, actions),
  withRouter
)(RecordList)
