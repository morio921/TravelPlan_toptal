import React, { Component } from 'react';
import {
  Alert,
  Button,
  Col,
  Row,
  Label,
  FormGroup,
  Form,
  Input,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DO_SIGNIN } from '../../../redux/modules/auth';
import { requestFail } from '../../../redux/api/request';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('This field is required'),
  password: Yup.string()
    .required('This field is required'),
});

class Signin extends Component {
  handleSignin = (values) => {
    const { signin, history } = this.props;
    signin({
      body: values,
      success: history.push('/records')
    });
  }

  render() {
    const { auth } = this.props;

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {auth.status === requestFail(DO_SIGNIN) &&
            <Alert color="danger">Invalid email or password!</Alert>
          }
          <Card className='card-header-style'>
            <CardHeader>
              <h2 className='text-center'>Log In</h2>
            </CardHeader>
            <CardBody>
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
                        <div className='validation-color'>{formik.errors.email}</div>
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
                        <div className='validation-color'>{formik.errors.password}</div>
                      ) : null}
                    </FormGroup>
                    <div className='text-center'>
                      <Button color='primary' type='submit'>Log In</Button>
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

export default Signin;
