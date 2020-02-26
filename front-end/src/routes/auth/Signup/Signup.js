import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { authStateSelector } from '../../../redux/selectors';
import { ucFirst } from '../../../helpers';
import { requestFail } from '../../../redux/api/request';
import { signup, DO_SIGNUP } from '../../../redux/modules/auth';

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
  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    signup: PropTypes.func
  };

  handleSignup = (values) => {
    const { history, signup } = this.props;
    signup({
      body: values,
      success: () => {
        history.push('/');
      }
    });
  }

  get errorText () {
    const { auth: { error } } = this.props;
    return error
    ? Object.keys(error.data).map((key) => (
      <div key={key}>{ucFirst(error.data[key].toString())}</div>
    ))
    : '';
  }

  render() {
    const { auth } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {auth.status === requestFail(DO_SIGNUP) &&
            <Alert color='danger'>{this.errorText}</Alert>
          }
          <h2 className='text-center mb-5'>New User Signup</h2>
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
                        <div style={{color: 'red'}}>{formik.errors.firstName}</div>
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
                        <div style={{color: 'red'}}>{formik.errors.lastName}</div>
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
                        <div style={{color: 'red'}}>{formik.errors.email}</div>
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
                        <div style={{color: 'red'}}>{formik.errors.password}</div>
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
                        <div style={{color: 'red'}}>{formik.errors.confirm_password}</div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>
                <Button color='primary' type='submit'>Signup</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  auth: authStateSelector
})

const actions = {
  signup
}

export default compose(
  connect(selector, actions)
)(Signup)
