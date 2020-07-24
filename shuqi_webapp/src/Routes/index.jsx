import React, { Component, Suspense, lazy } from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"



// import Home from '../pages/Home'
// import Car from "../pages/Car"
// import Choose from "../pages/Choose"
// import Mine from "../pages/Mine"
// import _404Page from '../pages/_404page'
// import Login from "../pages/Login"
// import Reg from "../pages/Reg"
// import _ChooseDetail from "../pages/_ChooseDetail"
// import Particulars from '../pages/Particulars'
// import Detail from "../pages/Detail"
// import Zhangejie from "../pages/Zhangjie"

// import Searchs from '../pages/Searchs/Searchs'
// import CommentArea from '../pages/CommentArea'//评论区

const Home = lazy(() => import("../pages/Home"))
const Car = lazy(() => import("../pages/Car"))
const Choose = lazy(() => import("../pages/Choose"))
const Mine = lazy(() => import("../pages/Mine"))
const _404Page = lazy(() => import("../pages/_404page"))
const Login = lazy(() => import("../pages/Login"))
const _ChooseDetail = lazy(() => import("../pages/_ChooseDetail"))
const Particulars = lazy(() => import("../pages/Particulars"))
const Detail = lazy(() => import("../pages/Detail"))
const Zhangejie = lazy(() => import("../pages/Zhangjie"))
const Searchs = lazy(() => import("../pages/Searchs/Searchs"))
const CommentArea = lazy(() => import("../pages/CommentArea"))
const Reg = lazy(() => import("../pages/Reg"))


export default class Routes extends Component {

    render() {
        return (
            <Router>
                <Suspense fallback={<div>loading...</div>}>
                <Switch>
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/home" component={Home} exact></Route>
                    <Route path="/car" component={Car}></Route>
                    <Route path="/choose/:type" component={_ChooseDetail}></Route>
                    <Route path="/choose" component={Choose}></Route>
                    <Route path="/mine" component={Mine}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/reg" component={Reg}></Route>
                    <Route path="/searchs" component={Searchs}></Route>
                    <Route path="/particulars" component={Particulars}></Route>
                    <Route path="/detail" component={Detail}></Route>
                    <Route path="/commentarea" component={CommentArea}></Route>
                    <Route path="/zhangjie" component={Zhangejie}></Route>
                    <Route component={_404Page}></Route>
                    <Redirect from="/" to="/home"></Redirect>


                </Switch>
                </Suspense>
            </Router>
        )
    }
}