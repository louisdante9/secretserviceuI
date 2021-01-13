import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CheckLoggedInUser from "./utils/CheckLoggedInUser";
import { PrivateRoute } from "./utils/PrivateRoute";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Dashboard from "./components/Dashboard";
const App = () => {
    return (
      <Router>
        <div id="app">
          <Switch>
            {/* <PrivateRoute exact path="/parcel/:id" component={ViewParcel} />
          <PrivateRoute exact path="/parcel" component={BookParcel} />*/}
           
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
           
           
          </Switch>
          <Route exact path="/" component={CheckLoggedInUser(Signin)} />
          <Route exact path="/signup" component={CheckLoggedInUser(Signup)} />
        </div>
      </Router>
    );
}
export default App;;
