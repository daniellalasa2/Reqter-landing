import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../Routes";
const Navigation = React.lazy(() => import("./Nav"));
const Footer = React.lazy(() => import("./Footer"));

class Layout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      window.scrollTo({ top: 0 });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <React.Fragment>
        {/* Routes */}
        <Suspense fallback={this.loading()}>
          <Switch>
            {routes.map((route, idx) => {
              console.log(route.navTransform);
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <React.Fragment>
                      <Navigation transform={route.navTransform} {...props} />
                      <route.component {...props} />
                    </React.Fragment>
                  )}
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
        <Suspense fallback={this.loading()}>
          <Footer />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default Layout;
