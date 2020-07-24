import React, { lazy, Suspense } from 'react';
import './App.css';
import { withRouter, Route, Switch } from "react-router-dom"
// import Login from "./pages/Login/index"
// import Index from "./pages/Index/index"
const Login = lazy(() => import("./pages/Login"))
const Index = lazy(() => import("./pages/Index"))
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
            <Route path="/index" component={Index}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Index}></Route>
          </Switch>
        </Suspense>
      </>
    )
  }
}

App = withRouter(App)
export default App;
