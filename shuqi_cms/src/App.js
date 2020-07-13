import React from 'react';
import './App.css';
import { withRouter, Route, Redirect, Switch, } from "react-router-dom"
import Login from "./pages/Login/index"
import Index from "./pages/Index/index"
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <Switch>
          <Route path="/index" component={Index}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Index}></Route>
        </Switch>
      </>
    )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
App = withRouter(App)
export default App;
