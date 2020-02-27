import RecordEdit from './RecordEdit';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import * as selectors from '../../../redux/selectors';
import {
  createRecord,
  getRecord,
  updateRecord,
} from '../../../redux/modules/record';

RecordEdit.propTypes = {
  createRecord: PropTypes.func,
  getRecord: PropTypes.func,
  history: PropTypes.object,
  profile: PropTypes.object,
  recordState: PropTypes.object,
  updateRecord: PropTypes.func,
};

const selector = createStructuredSelector({
  profile: selectors.profileSelector,
  recordState: selectors.recordStateSelector,
});

const actions = {
  createRecord,
  getRecord,
  updateRecord,
};

export default compose(
  connect(selector, actions),
  withRouter
)(RecordEdit);
