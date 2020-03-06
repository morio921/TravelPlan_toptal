import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  Alert
} from 'reactstrap';
import { Formik } from 'formik';
import { requestFail } from '../../../redux/api/request';
import { DO_SIGNUP } from '../../../redux/constants/auth';
import { UserAddSchema, signupInitialValues } from '../../../helpers/validationHelpers';

class Signup extends Component {
  handleSignup = (values) => {
    const { signup, history } = this.props;
    signup({
      body: values,
      sucess: history.push('/signin')
    });
  }

  render() {
    const { auth } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {auth.status === requestFail(DO_SIGNUP) &&
            <Alert className='alert-style' color='danger'>{auth.error.data.message}</Alert>
          }
          <Card className='card-header-style'>
            <CardHeader className='card-header-backcolor'>
              <h2 className='text-center'>Sign Up</h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues = {signupInitialValues}
                validationSchema={UserAddSchema}
                onSubmit={this.handleSignup}
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
                      <Col sm={6} xs={12}>
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

                      <Col sm={6} xs={12}>
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
                    <div className='text-center'>
                      <Button color='primary' type='submit'>Sign Up</Button>
                    </div>
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

export default Signup;
