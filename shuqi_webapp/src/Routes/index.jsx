import React, { Component } from 'react'

import {BrowserRouter as Router,Route, Switch, Redirect} from "react-router-dom"
import Home from '../pages/Home'
import Car from "../pages/Car"
import Choose from "../pages/Choose"
import Mine from "../pages/Mine"
import _404Page from '../pages/_404page'
import Searchs from '../pages/Searchs/Searchs'
import Particulars from '../pages/Particulars'

export default class Routes extends Component {
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/home" component={Home} exact></Route>
                    <Route path="/car" component={Car}></Route>
                    <Route path="/choose" component={Choose}></Route>
                    <Route path="/mine" component={Mine}></Route>
                    <Route path="/searchs" component={Searchs}></Route>
                    <Route path="/particulars" component={Particulars}></Route>
                    <Redirect from="/" to="/home"></Redirect>
                    <Route component={_404Page}></Route>
                </Switch>
            </Router>
        )
    }
}
