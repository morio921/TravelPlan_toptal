import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
  Input,
  Label,
  Card,
  CardHeader,
  CardBody,
  Alert
} from 'reactstrap';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { isManager } from '../../../helpers/roleHelpers';
import { requestSuccess } from '../../../redux/api/request';
import { UPDATE_USER, CREATE_USER } from '../../../redux/constants/user';
import { UserAddSchema, UserEditSchema, userInitialValues } from '../../../helpers/validationHelpers';

let roleOptions = [
  { 'value': 'user', 'label': 'User' },
  { 'value': 'manager', 'label': 'User Manager' },
  { 'value': 'admin', 'label': 'Admin' }
];

class UserEdit extends Component {
  componentDidMount() {
    const { getUser, match: { params } } = this.props;
    params.id && getUser({ id: params.id });
  }

  handleSave = (values) => {
    const { createUser, updateUser, match: { params } } = this.props;

    params.id
      ? updateUser({
        id: params.id,
        body: values
      })
      : createUser({
        body: values
      });
  }

  render() {
    const { userState, auth, match: { params } } = this.props;
    let roles = roleOptions;
    if(isManager(auth)) roles = _.reject(roles, { 'value': 'admin' });

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {userState.status === requestSuccess(UPDATE_USER) &&
            <Alert className='alert-style' color='info'>User is updated successfully!</Alert>
          }
          {userState.status === requestSuccess(CREATE_USER) &&
            <Alert className='alert-style' color='info'>User is created successfully!</Alert>
          }
          <Card className='card-header-style'>
            <CardHeader className='card-header-backcolor'>
              <h2 className='text-center'>
                {params.id ? 'Edit User' : 'Add User'}
              </h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues = {(params.id && userState.user) ? {
                  firstName: userState.user.firstName,
                  lastName: userState.user.lastName,
                  email: userState.user.email,
                  role: userState.user.role,
                  password: '',
                  confirm_password: ''
                } : userInitialValues}
                validationSchema={params.id ? UserEditSchema : UserAddSchema}
                onSubmit={this.handleSave}
                enableReinitialize
              >
                {formik => (
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col sm={6} xs={12}>
                        <FormGroup>
                          <Label for='firstName'>First Name</Label><br />
                          <Input
                            id='firstName'
                            name='firstName'
                            type='text'
                            placeholder='Enter first name'
                            value={formik.values.firstName}
                            {...formik.getFieldProps('firstName')}
                          />
                          {formik.errors.firstName && formik.touched.firstName ? (
                            <div className='validation-color'>{formik.errors.firstName}</div>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col sm={6} xs={12}>
                        <FormGroup>
                          <Label for='lastName'>Last Name</Label><br />
                          <Input
                            id='lastName'
                            name='lastName'
                            type='text'
                            placeholder='Enter last name'
                            value={formik.values.lastName}
                            {...formik.getFieldProps('lastName')}
                          />
                          {formik.errors.lastName && formik.touched.lastName ? (
                            <div className='validation-color'>{formik.errors.lastName}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='email'>Email</Label><br />
                          <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='Enter email'
                            value={formik.values.email}
                            {...formik.getFieldProps('email')}
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <div className='validation-color'>{formik.errors.email}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='role'>Role</Label><br />
                          <Input
                            id='role'
                            name='role'
                            type='select'
                            value={formik.values.role}
                            {...formik.getFieldProps('role')}
                          >
                            {roles.map((roleItem, key) => (
                              <option value={roleItem['value']} key={key}>{roleItem['label']}</option>
                            ))}
                          </Input>
                          {formik.errors.role && formik.touched.role ? (
                            <div className='validation-color'>{formik.errors.role}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='password'>Password</Label><br />
                          <Input
                            id='password'
                            name='password'
                            type='password'
                            placeholder='Enter password'
                            value={formik.values.password}
                            {...formik.getFieldProps('password')}
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <div className='validation-color'>{formik.errors.password}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='confirm_password'>Confirm Password</Label><br />
                          <Input
                            id='confirm_password'
                            name='confirm_password'
                            type='password'
                            placeholder='Enter confirm password'
                            value={formik.values.confirm_password}
                            {...formik.getFieldProps('confirm_password')}
                          />
                          {formik.errors.confirm_password && formik.touched.confirm_password ? (
                            <div className='validation-color'>{formik.errors.confirm_password}</div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={6}>
                        <Link to='/users' className='btn btn-secondary'>
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

export default UserEdit;
