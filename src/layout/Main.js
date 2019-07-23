import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../Routes";

const Navigation = React.lazy(() => import("./Nav"));
const Footer = React.lazy(() => import("./Footer"));

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navTransformStatus: true
    };
  }
  componentDidMount() {
    this.navTransform(this.props.navTransform);
  }
  navTransform = status => {
    this.setState({
      navTransformStatus: Boolean(status)
    });
  };
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  render() {
    return (
      <React.Fragment>
        <Navigation transform={this.state.navTransformStatus} />
        {/* Routes */}
        <Suspense fallback={this.loading()}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => <route.component {...props} />}
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
