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
  CardHeader
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name is too short')
    .max(50, 'First name is too long')
    .required('This field is required'),
  lastName: Yup.string()
    .min(2, 'Last name is too short')
    .max(50, 'Last name is too long')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  password: Yup.string()
    .min(5, 'Password is too short')
    .required('This field is required'),
  confirm_password: Yup.string()
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
    .required('This field is required'),
});

class Signup extends Component {
  handleSignup = (values) => {
    const { history, signup } = this.props;
    signup({
      body: values,
      success: () => history.push('/')
    });
  }

  render() {
    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          <Card className='card-header-style'>
            <CardHeader>
              <h2 className='text-center'>Sign Up</h2>
            </CardHeader>
            <CardBody>
              <Formik
                initialValues = {{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirm_password: ''
                }}
                validationSchema={SignupSchema}
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
