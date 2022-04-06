import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC | any;
  path: string;
  exact?: boolean;
  strict?: boolean;
  isAcceptRole: boolean,
}
const PrivateRoute: React.FC<PrivateRouteProps> = (
  {
    isAcceptRole, component, path, exact, strict,
  }: PrivateRouteProps,
) => (isAcceptRole
  ? (
    <Route
      path={path}
      exact={exact || false}
      strict={strict || false}
      component={component}
    />
  )
  : (<Redirect to="/" />)
);
PrivateRoute.defaultProps = { exact: false, strict: false };

export default PrivateRoute;
