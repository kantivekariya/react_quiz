import React, { Suspense } from "react";
import { connect } from "react-redux";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./Private";
import PublicRoute from "./Public";
import routes from "./Routes";
import Loader from "./Loader";
import { Spin } from "antd";

const Routes = (props) => {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          {Boolean(props.loadingBar.default) && (
            <Spin
              size="large"
              className={`ajax-global-spin`}
              wrapperClassName={`ajax-global-spin`}
              spinning={true}
            />
          )}
          <Switch>
            {routes.map((route, i) => {
              if (route.auth) {
                return (
                  <PrivateRoute
                    key={i}
                    isAuthenticated={props.isAuthenticated}
                    {...route}
                  />
                );
              } else {
                return (
                  <PublicRoute
                    key={i}
                    isAuthenticated={props.isAuthenticated}
                    {...route}
                  />
                );
              }
            })}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    loadingBar: state.loadingBar
  };
};

export default connect(mapStateToProps)(Routes);
