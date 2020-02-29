import Signin from './Signin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { authStateSelector } from '../../../redux/selectors';
import { signin } from '../../../redux/modules/auth';

Signin.propTypes = {
  auth: PropTypes.object,
  signin: PropTypes.func,
  history: PropTypes.object
};

const selector = createStructuredSelector({
  auth: authStateSelector
});

const actions = {
  signin
};

export default compose(
  connect(selector, actions)
)(Signin);
