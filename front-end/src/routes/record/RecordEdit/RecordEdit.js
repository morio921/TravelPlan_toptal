import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { getDateStr } from '../../../helpers';
import moment from 'moment';

const RecordEditSchema = Yup.object().shape({
  destination: Yup.string()
    .min(2, 'Destination is too short')
    .max(50, 'Destination is too long')
    .required('This field is required'),
  startDate: Yup.date()
    .required('This field is required'),
  endDate: Yup.date()
    .required('This field is required')
    .test('date-compare', 'End date must be later than start date', function(value) {
      return this.parent.startDate <= value;
    }),
  comment: Yup.string()
    .min(5, 'Comment is too short')
    .required('This field is required'),
});

class RecordEdit extends Component {
  componentDidMount() {
    const { getRecord, match: { params } } = this.props;
    params.id && getRecord({ id: params.id });
  }

  handleSave = (values) => {
    const { createRecord, updateRecord, match: { params }, history, profile } = this.props;
    const finalValues = {
      comment: values.comment,
      destination: values.destination,
      startDate: getDateStr(values.startDate),
      endDate: getDateStr(values.endDate),
      userName: profile.firstName + ' ' + profile.lastName
    };

    params.id ? updateRecord({
      id: params.id,
      body: finalValues,
      success: () => history.push('/records')
    }) : createRecord({
      body: finalValues,
      success: () => history.push('/records')
    });
  }

  render() {
    const { recordState, match: { params } } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <h2 className='text-center mb-5'>
            {params.id ? 'Edit Travel Record' : 'Add New Travel Record'}
          </h2>
          <Formik
            initialValues = {(params.id && recordState.record) ? {
              destination: recordState.record.destination,
              startDate: moment(recordState.record.startDate).format('YYYY-MM-DD'),
              endDate: moment(recordState.record.endDate).format('YYYY-MM-DD'),
              comment: recordState.record.comment
            } : {
              destination: '',
              startDate: '',
              endDate: '',
              comment: ''
            }}
            validationSchema={RecordEditSchema}
            onSubmit={this.handleSave}
            enableReinitialize
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='destination'>Destination</Label><br />
                      <Input
                        id='destination'
                        name='destination'
                        type='text'
                        placeholder='Enter destination'
                        value={formik.values.destination}
                        {...formik.getFieldProps('destination')}
                      />
                      {formik.errors.destination && formik.touched.destination ? (
                        <div className='validation-color'>{formik.errors.destination}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for="startDate">Start Date</Label>
                      <Input
                        id='startDate'
                        type='date'
                        name='startDate'
                        value={formik.values.startDate}
                        {...formik.getFieldProps('startDate')}
                      />
                      {formik.errors.startDate && formik.touched.startDate ? (
                        <div className='validation-color'>{formik.errors.startDate}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for="toDate">End Date</Label>
                      <Input
                        id='endDate'
                        type='date'
                        name='endDate'
                        value={formik.values.endDate}
                        {...formik.getFieldProps('endDate')}
                      />
                      {formik.errors.endDate && formik.touched.endDate ? (
                        <div className='validation-color'>{formik.errors.endDate}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for='comment'>Comment</Label><br />
                      <Input
                        id='comment'
                        name='comment'
                        type='text'
                        placeholder='Enter comment'
                        value={formik.values.comment}
                        {...formik.getFieldProps('comment')}
                      />
                      {formik.errors.comment && formik.touched.comment ? (
                        <div className='validation-color'>{formik.errors.comment}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col xs={6}>
                    <Link to='/records' className='btn btn-secondary'>
                      Cancel
                    </Link>
                  </Col>
                  <Col className='text-right'>
                    <Button color='primary' type='submit'>Save</Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    )
  }
}

export default RecordEdit;
