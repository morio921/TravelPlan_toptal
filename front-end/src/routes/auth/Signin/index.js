import Signin from './Signin';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { authStatusSelector } from '../../../redux/selectors';
import { signin } from '../../../redux/modules/auth';

Signin.propTypes = {
  auth: PropTypes.string,
  signin: PropTypes.func,
  history: PropTypes.object
};

const selector = createStructuredSelector({
  auth: authStatusSelector
});

const actions = {
  signin
};

export default compose(
  connect(selector, actions)
)(Signin);
