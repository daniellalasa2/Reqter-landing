import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../Routes";
import "./Main.scss";
const Navigation = React.lazy(() => import("./Nav"));
const Footer = React.lazy(() => import("./Footer"));

class Layout extends Component {
  gtagUpdater = (location, pageName) => {
    if (window.gtag) {
      window.gtag("config", "UA-145850270-1", {
        page_title: pageName,
        page_path: location.pathname,
        page_search: location.search
      });
    }
  };
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
        <Suspense>
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
                      {this.gtagUpdater(this.props.history, route.name)}
                      <Navigation transform={route.navTransform} {...props} />
                      <route.component {...props} />
                    </React.Fragment>
                  )}
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default Layout;
