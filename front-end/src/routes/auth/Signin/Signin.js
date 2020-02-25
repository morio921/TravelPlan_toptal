import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  Col,
  Row,
  Label,
  FormGroup,
  Form,
  Input
} from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { authStateSelector } from '../../../redux/selectors';
import { signin, DO_SIGNIN } from '../../../redux/modules/auth';
import { requestFail } from '../../../redux/api/request';
import './Signin.css';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
});

class Signin extends Component {
  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    signin: PropTypes.func
  };

  handleSignin = (values) => {
    const { signin } = this.props;
    signin({ body: values });
  }

  render() {
    const { auth } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {auth.status === requestFail(DO_SIGNIN) &&
            <Alert color="danger">Invalid email or password!</Alert>
          }
          <h2 className='text-center mb-5'>LogIn</h2>
          <Formik
            initialValues = {{
              email: '',
              password: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={this.handleSignin}
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
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
                    <div className='error-message danger'>{formik.errors.email}</div>
                  ) : null}
                </FormGroup>

                <FormGroup>
                <Label for='password'>Password</Label><br />
                  <Input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter password'
                    value={formik.values.email}
                    {...formik.getFieldProps('password')}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className='error-message danger'>{formik.errors.password}</div>
                  ) : null}
                </FormGroup>
                <Button color='primary' type='submit'>Signin</Button>
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
  signin
}

export default compose(
  connect(selector, actions)
)(Signin)
