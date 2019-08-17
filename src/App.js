import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.scss";
import Layout from "./layout/Main";
import "samim-font/dist/font-face.css";

class App extends React.Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Suspense fallback={this.loading()}>
            <Switch>
              <Route
                path="/"
                name="Home"
                render={props => <Layout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
