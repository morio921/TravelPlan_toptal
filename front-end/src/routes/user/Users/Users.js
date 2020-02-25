import React from 'react';
import { Route } from 'react-router-dom';
import UserEdit from '../UserEdit';
import UserList from '../UserList';

export default () => (
  <div>
    <Route path='/users' exact component={UserList} />
    <Route path='/users/edit/:id' component={UserEdit} />
    <Route path='/users/new' component={UserEdit} />
  </div>
)
