import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Card,
  CardBody,
  CardHeader,
  Alert,
} from 'reactstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getDateStr } from '../../../helpers';
import { requestSuccess } from '../../../redux/api/request';
import { UPDATE_RECORD, CREATE_RECORD } from '../../../redux/constants/record';
import { RecordEditSchema, recordInitialValues } from '../../../helpers/validationHelpers';

class RecordEdit extends Component {
  componentDidMount() {
    const { getRecord, match: { params } } = this.props;
    params.id && getRecord({ id: params.id });
  }

  handleSave = (values) => {
    const { createRecord, updateRecord, match: { params }, profile } = this.props;

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
    }) : createRecord({
      body: finalValues,
    });
  }

  render() {
    const { recordState, match: { params } } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {recordState.status === requestSuccess(UPDATE_RECORD) &&
            <Alert className='alert-style' color='info'>Record is updated sucessufully!</Alert>
          }
          {recordState.status === requestSuccess(CREATE_RECORD) &&
            <Alert className='alert-style' color='info'>Record is created sucessufully!</Alert>
          }
          <Card className='card-header-style'>
            <CardHeader className='card-header-backcolor'>
              <h2 className='text-center'>
                {params.id ? 'Edit Plan' : 'Add Plan'}
              </h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues = {(params.id && recordState.record) ? {
                  destination: recordState.record.destination,
                  startDate: moment(recordState.record.startDate).format('YYYY-MM-DD'),
                  endDate: moment(recordState.record.endDate).format('YYYY-MM-DD'),
                  comment: recordState.record.comment
                } : recordInitialValues}
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
                            type='textarea'
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
                          Back
                        </Link>
                      </Col>
                      <Col className='text-right'>
                        <Button color='primary' type='submit'>Save</Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default RecordEdit;
