import RecordList from './RecordList';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import {
  getRecords,
  deleteRecord
} from '../../../redux/actions/record';
import {
  recordsListSelector,
  recordsParamsSelector,
  profileSelector
} from '../../../redux/selectors';

RecordList.propTypes = {
  deleteRecord: PropTypes.func,
  getRecords: PropTypes.func,
  pagination: PropTypes.object,
  recordsList: PropTypes.array,
  profile: PropTypes.object,
};

const selector = createStructuredSelector({
  recordsList: recordsListSelector,
  params: recordsParamsSelector,
  profile: profileSelector,
});

const actions = {
  getRecords,
  deleteRecord
};

export default compose(
  connect(selector, actions),
  withRouter
)(RecordList);
