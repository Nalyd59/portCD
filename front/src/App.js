import React, { Component } from "react";
import './App.css';
import routes from "./routes";
import withRouter from "./components/withRouter";
import {
  Route,
  Routes
} from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
    render() {
        return (
          <React.Fragment>
            <Routes>
              {routes.map((route, idx) => (
                <Route path={route.path} element={route.component} key={idx} />
              ))}
            </Routes>
        </React.Fragment>
      );
    }
  }
  
  export default withRouter(App);