import Header from './Header';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signout } from '../../redux/actions/auth';

Header.propTypes = {
  auth: PropTypes.object,
  signout: PropTypes.func
};

const selector = (state) => ({
  auth: state.auth,
});

const actions = {
  signout
};

export default connect(selector, actions)(Header);
