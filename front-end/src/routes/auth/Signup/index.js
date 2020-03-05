import Signup from './Signup';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authStateSelector } from '../../../redux/selectors';
import { signup } from '../../../redux/actions/auth';

Signup.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object,
  signup: PropTypes.func
};

const selector = createStructuredSelector({
  auth: authStateSelector
});

const actions = {
  signup
};

export default compose(
  connect(selector, actions)
)(Signup);
