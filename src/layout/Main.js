import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../Routes";
import "./loader.scss";
const Navigation = React.lazy(() => import("./Nav"));
const Footer = React.lazy(() => import("./Footer"));

class Layout extends Component {
  constructor(props) {
    super(props);
    //Gtag implementation for single page application
    props.history.listen(location => {
      if (window.gtag) {
        window.gtag("config", "UA-145850270-1", {
          page_title: "startup space",
          page_path: location.pathname
        });
      }
    });
  }
  loading = () => (
    <div className="preloader">
      <div className="ball-rotate">
        <div />
      </div>
      <span className="loading-text">
        <strong>Startup Space</strong>
      </span>
    </div>
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
