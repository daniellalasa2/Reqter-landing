import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../Routes";
import "./Main.scss";
import ContextApi from "../components/ContextApi/ContextApi";
import { GetCookie } from "../components/CookieHandler/CookieHandler";
const Navigation = React.lazy(() => import("./Nav"));
const Footer = React.lazy(() => import("./Footer"));

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuth: Boolean(GetCookie("SSUSERAUTH"))
    };
    this.updateAuth = (status, callback) => {
      this.setState(
        {
          userAuth: status ? status : Boolean(GetCookie("SSUSERAUTH"))
        },
        () => {
          callback(this.state.userAuth);
        }
      );
    };
  }
  //google tag manager handler
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
                  render={props =>
                    !route.auth || route.auth === this.state.userAuth ? (
                      <React.Fragment>
                        {this.gtagUpdater(this.props.history, route.name)}
                        <ContextApi.Provider
                          value={{
                            auth: this.state.userAuth,
                            updateAuth: this.updateAuth
                          }}
                        >
                          <React.Fragment>
                            <Navigation
                              transform={route.navTransform}
                              {...props}
                            />
                            <route.component {...props} />
                          </React.Fragment>
                        </ContextApi.Provider>
                      </React.Fragment>
                    ) : (
                      <Redirect to="/" />
                    )
                  }
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
