import React, { Component } from 'react'

import BottomNav from '../../components/BottomNav'



export default class PageLayout extends Component {
    render() {
        const { children } = this.props

        const res = children
        // console.log(res.props);
        return (
            <div>
                {children}
                  <BottomNav></BottomNav>
            </div>
        )
    }
}