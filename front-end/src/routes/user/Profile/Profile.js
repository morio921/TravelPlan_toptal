import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Row,
  Input,
  Label
} from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { updateUser } from '../../../redux/modules/user';
import { signout } from '../../../redux/modules/auth';
import * as selectors from '../../../redux/selectors';

const ProfileEditSchema = Yup.object().shape({
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

class Profile extends Component {
  static propTypes = {
    history: PropTypes.object,
    profile: PropTypes.object,
    updateUser: PropTypes.func,
  };

  handleSave = (values) => {
    const { updateUser, profile, signout } = this.props;

    profile._id && updateUser({
      id: profile._id,
      body: values,
      success: () => signout()
    });
  }

  render() {
    const { profile } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          <h2 className='text-center mb-5'>
            Edit Profile
          </h2>
          <Formik
            initialValues = {{
              firstName: profile.firstName,
              lastName: profile.lastName,
              email: profile.email,
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

const selector = createStructuredSelector({
  profile: selectors.profileSelector,
});

const actions = {
  updateUser,
  signout
};

export default compose(
  connect(selector, actions),
  withRouter
)(Profile);
