import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import Main from "./layout/Main/Main";
import "samim-font/dist/font-face.css";

class App extends React.Component {
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

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  render() {
    return (
      <div className="App">
        <HashRouter>
          <React.Suspense fallback={this.loading()}>
            <Switch>
              <Redirect exact from="/" to="/fa" />
              <Route
                path="/:lang?"
                name="Home"
                render={props => <Main {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </div>
    );
  }
}

export default App;
