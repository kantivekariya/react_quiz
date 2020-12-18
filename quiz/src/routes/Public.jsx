import React from 'react';
import { Route } from 'react-router';

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} {...rest} title={rest.title} />} />
);

export default PublicRoute;
