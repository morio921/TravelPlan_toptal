import React from 'react';
import { Route } from 'react-router-dom';
import RecordEdit from '../RecordEdit';
import RecordList from '../RecordList';

export default () => (
  <div>
    <Route path='/records' exact component={RecordList} />
    <Route path='/records/edit/:id' component={RecordEdit} />
    <Route path='/records/new' component={RecordEdit} />
  </div>
)
