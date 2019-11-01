import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Navigation = React.lazy(() => import("../Nav/Nav"));
const Footer = React.lazy(() => import("../Footer/Footer"));
class Main extends Component {
  constructor(props) {
    super(props);
    this.authObj = this.getCurrentUserAuthFromCookie();
    this.supportedLanguages = ["en", "fa"];
    this.defaultLang = "fa";
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
    this.lang = this.urlLangPathname ? this.urlLangPathname : this.defaultLang;
    this.src = Boolean(GetSession("src"))
      ? GetSession("src")
      : SetSession(
          "src",
          Boolean(this.parsedUrlObject.src)
            ? this.parsedUrlObject.src
            : "direct"
        );
    this.translate = require(`./_locales/${this.lang}.json`);
    window.src = GetSession("src");
    this.state = {
      componentTreeErrorCatched: false,
      lang: this.lang,
      userAuth: {
        ROLE: this.authObj ? this.authObj.ROLE : "newcomer",
        ID: this.authObj.ID ? this.authObj.ID : "",
        TOKEN: this.authObj ? this.authObj.TOKEN : ""
      },
      displayLoginModal: false,
      loginModalTitle: this.translate.locale.login,
      defaultPhoneNumber: this.authObj ? this.authObj.ID : ""
    };
  }
  getCurrentUserAuthFromCookie = () => {
    return GetCookie("SSUSERAUTH")
      ? JsonParser(GetCookie("SSUSERAUTH"))
      : GetCookie("SSGUESTAUTH")
      ? JsonParser(GetCookie("SSGUESTAUTH"))
      : {};
  };
  toggleLoginModal = (status, modalTitle, defaultPhoneNumber) => {
    this.setState({
      displayLoginModal:
        typeof status === "boolean" ? status : !this.state.displayLoginModal,
      loginModalTitle: modalTitle ? modalTitle : this.translate.locale.login,
      defaultPhoneNumber: defaultPhoneNumber
    });
  };
  //if any argument was sent then set incoming argument else update user authentication based on set cookie
  updateAuth = callback => {
    this.setState(
      {
        userAuth: this.getCurrentUserAuthFromCookie(), //DO NOT REPLACE THIS WITH this.authObj
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
  static getDerivedStateFromError(error) {
    return {
      componentTreeErrorCatched: true
    };
  }

  createNotif = (type, text) => {
    const { locale } = this.translate;
    const closeTime = 3000;
    switch (type) {
      case "info":
        NotificationManager.info(locale.notification.info, text, closeTime);
        break;
      case "success":
        NotificationManager.success(locale.notification.info, text, closeTime);
        break;
      case "error":
        NotificationManager.error(locale.notification.info, text, closeTime);
        break;

      case "warning":
        NotificationManager.warning(locale.notification.info, text, closeTime);
        break;
      default:
        return;
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
    if (this.state.componentTreeErrorCatched) {
      return <Redirect to={`/${this.lang}/auth/internalerror`} />;
    }
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
                    //check if user has permission to access route
                    !Array.isArray(route.auth) ||
                    route.auth.indexOf(this.state.userAuth.ROLE) > -1 ? (
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
                            langTrigger: this.langTrigger,
                            defaultLang: this.defaultLang,
                            displayNotif: this.createNotif
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
                      <React.Fragment>
                        {this.state.userAuth === "partner" && (
                          <Redirect
                            from="/:lang?/partnerpanel/login"
                            to="/:lang?/partnerpanel/panel"
                          />
                        )}
                        {this.state.userAuth !== "partner" && (
                          <Redirect
                            from="/:lang?/partnerpanel/panel"
                            to="/:lang?/partnerpanel/login"
                          />
                        )}
                        <Redirect to={`/${this.defaultLang}`} />
                      </React.Fragment>
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
