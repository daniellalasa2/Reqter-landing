import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import routes from "../../Routes";
import "./Main.scss";
import ContextApi from "../../components/ContextApi/ContextApi";
import {
  SetSession,
  GetSession
} from "../../components/CookieHandler/CookieHandler";
import {
  GetCookie,
  JsonParser
} from "../../components/CookieHandler/CookieHandler";
const Navigation = React.lazy(() => import("../Nav/Nav"));
const Footer = React.lazy(() => import("../Footer/Footer"));
class Main extends Component {
  constructor(props) {
    super(props);
    this.supportedLanguages = ["en", "fa"];
    this.authObj = GetCookie("SSUSERAUTH")
      ? JsonParser(GetCookie("SSUSERAUTH"))
      : GetCookie("SSGUESTAUTH")
      ? JsonParser(GetCookie("SSGUESTAUTH"))
      : {};
    this.parsedUrlObject = this.urlParser(props.location.search);
    this.urlLangPathname = (function(supportedLanguagesArr) {
      const extractedLang = window.location.hash.replace("#", "").split("/")[1];
      let toBeReturned = false;
      if (Array.isArray(supportedLanguagesArr)) {
        toBeReturned =
          supportedLanguagesArr.indexOf(extractedLang) > -1 && extractedLang;
      }
      return toBeReturned;
    })(this.supportedLanguages);
    this.src = Boolean(GetSession("src"))
      ? GetSession("src")
      : SetSession(
          "src",
          Boolean(this.parsedUrlObject.src)
            ? this.parsedUrlObject.src
            : "direct"
        );

    window.src = GetSession("src");
    this.state = {
      lang: this.urlLangPathname ? this.urlLangPathname : "fa",
      userAuth: {
        ROLE: this.authObj ? this.authObj.ROLE : "newcomer",
        ID: this.authObj.ID ? this.authObj.ID : "",
        TOKEN: this.authObj ? this.authObj.TOKEN : ""
      },
      displayLoginModal: false,
      loginModalTitle: "ورود",
      defaultPhoneNumber: this.authObj ? this.authObj.ID : ""
    };
  }
  toggleLoginModal = (status, modalTitle, defaultPhoneNumber) => {
    this.setState({
      displayLoginModal:
        typeof status === "boolean" ? status : !this.state.displayLoginModal,
      loginModalTitle: modalTitle ? modalTitle : "ورود",
      defaultPhoneNumber: defaultPhoneNumber
    });
  };
  //if any argument sent then set incoming argument else update user authentication based on set cookie
  updateAuth = callback => {
    this.setState(
      {
        userAuth: JsonParser(GetCookie("SSUSERAUTH")), //DO NOT REPLACE THIS WITH this.authObj
        displayLoginModal: false
      },
      () => {
        callback &&
          typeof callback === "function" &&
          callback(this.state.userAuth);
      }
    );
  };
  langTrigger = locale => {
    const urlMatch =
      this.supportedLanguages.indexOf(this.props.match.params.lang) > -1
        ? this.props.match.url
        : null;
    const newUrl = {
      ...this.props.location,
      pathname: urlMatch
        ? this.props.location.pathname.replace(urlMatch, `/${locale}`)
        : `/${locale}` + this.props.location.pathname
    };
    this.props.history.replace(newUrl);
    window.location.reload();
  };
  urlParser = url => {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    return params;
  };
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
    const { history } = this.props;
    this.unlisten = history.listen(action => {
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
                    !route.auth || route.auth === this.state.userAuth.ROLE ? (
                      <React.Fragment>
                        {this.gtagUpdater(this.props.history, route.name)}
                        <ContextApi.Provider
                          value={{
                            auth: this.state.userAuth,
                            updateAuth: this.updateAuth,
                            displayLoginModal: this.state.displayLoginModal,
                            toggleLoginModal: this.toggleLoginModal,
                            loginModalTitle: this.state.loginModalTitle,
                            defaultPhoneNumber: this.state.defaultPhoneNumber,
                            lang: this.state.lang,
                            langTrigger: this.langTrigger
                          }}
                        >
                          <React.Fragment>
                            {route.navStatus && (
                              <Navigation
                                transform={route.navTransform}
                                {...props}
                              />
                            )}
                            <route.component {...props} />
                          </React.Fragment>
                        </ContextApi.Provider>
                      </React.Fragment>
                    ) : (
                      <Redirect to="/fa" />
                    )
                  }
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
        <Suspense>
          <ContextApi.Provider
            value={{
              lang: this.state.lang
            }}
          >
            <Footer />
          </ContextApi.Provider>
        </Suspense>
      </React.Fragment>
    );
  }
}

export default Main;
