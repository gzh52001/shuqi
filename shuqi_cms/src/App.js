import React, { Fragment } from 'react';
import './App.css';
import { withRouter, Route, Switch } from "react-router-dom"
import Login from "./pages/Login/index"
import Index from "./pages/Index/index"

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/index" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Index}></Route>
        </Switch>
      </Fragment>
    )
  }
}

App = withRouter(App)
export default App;
