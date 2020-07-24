import React, { Component } from 'react'
import PageLayout from '../../layout/PageLoyout'
import './lmhmine.scss'

import {message} from 'antd'

export default class Mine extends Component {
    constructor() {
        super()
        this.state = {
            name: localStorage.getItem('shuiqiname')
        }
    }
    gotoLogin = () => {
        const { history } = this.props
        history.push('/login')
    }
    gotoReg = () => {
        const { history } = this.props
        history.push('/reg')
    }
    outlogin=()=>{
        const { history } = this.props
        localStorage.removeItem("shuqiuser")
        localStorage.removeItem("shuiqitoken")
        localStorage.removeItem("shuiqiname")
        this.setState({
            name:''
        })
        history.push('/mine')
        message.success("退出成功！",1)
    }
    render() {
        const { name } = this.state
        return (
            <PageLayout>

                <div className="minebox" style={{paddingBottom:100}}>
                    <div className="headwrap">
                        <div className="myself">
                            <div className="tou"><img src="data:image/png;base64,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" alt="" /></div>
                            {

                                name ? <div className="namebox">{name}</div> : <div className="reg">
                                    <span onClick={this.gotoLogin}>登录</span>
                                    &nbsp;
                                    <span>/</span>
                                    &nbsp;
                                    <span onClick={this.gotoReg}>注册</span>
                                </div>



                           }


                        </div>
                    </div>

                    <div className="item-box">
                        <p><span className="one">我的会员</span>   <span><span className="two">开通会员</span><i className="iconfont icon-iconfontjiantou5 two"></i></span></p>
                        <p><span className="one">书豆</span>    <span><span className="two">充值</span><i className="iconfont icon-iconfontjiantou5 two"></i></span></p>
                        <p><span className="one">消费充值记录</span>  <span><span></span><i className="iconfont icon-iconfontjiantou5 two"></i></span></p>
                        <p><span className="one">购买过的书</span>    <span><span></span><i className="iconfont icon-iconfontjiantou5 two"></i></span></p>
                        <p><span className="one">意见反馈</span>   <span><span className="two">ID:8000000</span><i className="iconfont icon-iconfontjiantou5 two"></i></span></p>
                        <div></div>
                        <p><button className="quit" onClick={this.outlogin}>退出登录</button></p>
                    </div>
                </div>
            </PageLayout>
        )
    }
}