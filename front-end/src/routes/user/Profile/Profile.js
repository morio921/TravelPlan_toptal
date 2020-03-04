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
  CardBody,
  CardHeader,
  Alert
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { requestSuccess } from '../../../redux/api/request';
import { DO_UPDATE_PROFILE } from '../../../redux/modules/auth';

const ProfileEditSchema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string()
    .email('Invalid email'),
  password: Yup.string(),
  confirm_password: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    }),
});

class Profile extends Component {
  handleSave = (values) => {
    const { updateProfile, auth } = this.props;

    auth.me._id && updateProfile({
      id: auth.me._id,
      body: values
    });
  }

  render() {
    const { auth } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {auth.status === requestSuccess(DO_UPDATE_PROFILE) &&
            <Alert className='alert-style' color='info'>Profile is updated sucessufully!</Alert>
          }
          <Card className='card-header-style'>
            <CardHeader className='card-header-backcolor'>
              <h2 className='text-center'>
                Edit Profile
              </h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues = {{
                  firstName: auth.me.firstName,
                  lastName: auth.me.lastName,
                  email: auth.me.email,
                  password: '',
                  confirm_password: ''
                }}
                validationSchema={ProfileEditSchema}
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

export default Profile;
