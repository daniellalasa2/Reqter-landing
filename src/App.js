import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Main from "./layout/Main/Main";
import "samim-font/dist/font-face.css";
import PageSuspense from "./components/PageSuspense";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <React.Suspense fallback={PageSuspense()}>
            <Switch>
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
