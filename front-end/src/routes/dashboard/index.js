import Dashboard from './Dashboard';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router';
import { getFutureRecords, deleteRecord } from '../../redux/modules/record';
import { recordsListSelector, recordsParamsSelector, profileSelector } from '../../redux/selectors';

Dashboard.propTypes = {
  deleteRecord: PropTypes.func,
  getFutureRecords: PropTypes.func,
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
  getFutureRecords,
  deleteRecord
};

export default compose(
  connect(selector, actions),
  withRouter
)(Dashboard);
