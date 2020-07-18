import React, { Component } from 'react'
import {NavLink} from "react-router-dom"

import "./bottom.scss"



class BottomNav extends Component {
    constructor() {
        super()
        this.state = {
            menu: [{
                key: "car",
                title: "书架",
                link: '/car',
                icon: 'wodeshujia',
               
            }, {
                key: "home",
                title: "书城",
                link: '/home',
                icon: 'shucheng',
              
            }, {
                key: "choose",
                title: "分类",
                link: '/choose',
                icon: 'leimupinleifenleileibie',
               
            }, {
                key: "mine",
                title: "我的",
                link: '/mine',
                icon: 'wode',
               
            }]
        }
    }
 
    render() {
        const { menu } = this.state
        return (
            <footer>
                <ul>
                    {
                        menu.map(item => (
                            <li className="Menubottom" key={item.key} >
                                <NavLink to={item.link} activeStyle={{color:"23b383",background:"23b383"}}>
                                <span className={"iconfont icon-" + item.icon}></span>
                                <p>{item.title}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                
            </footer>
        )
    }
}





export default BottomNav