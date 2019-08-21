import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Layout from "./layout/Main";
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

  render() {
    return (
      <div className="App">
        <HashRouter>
          <React.Suspense fallback={this.loading()}>
            <Switch>
              <Route
                path="/"
                name="Home"
                render={props => <Layout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </div>
    );
  }
}

export default App;
