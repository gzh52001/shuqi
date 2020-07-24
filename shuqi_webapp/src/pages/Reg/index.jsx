import React, { Component } from 'react'
import "./reg.scss"

import Regval from "../../api/loginwreg"

import {message} from 'antd'

export default class Reg extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            pwd: ''
        }
        this.gotoLogin = this.gotoLogin.bind(this)
        this.checkup = this.checkup.bind(this)
    }
    gotomine = () => {
        let { history } = this.props
        history.push('/mine')
    }
    async checkup(){
        let {user} = this.state
         try{
            let p = await Regval.checkuser(user)
            // console.log(p);
            if(p.flag == false){
                message.error('亲！用户名已经被注册了',1);
            }
         }catch(err){
             console.log(err);
         }
    }
    async gotoLogin() {
        let { history } = this.props
        let { user, pwd } = this.state
        // history.push('/login')

        try {
            let res = await Regval.checkuser(user)
            if (res.flag == true) {
                let p = await Regval.reguser(user, pwd);
                
                // console.log(p);
                if (p.flag == true) {
                    message.success('注册成功！',1)
                    history.push('/login')
                } else {
                    message.success('注册失败！',1)
                }
            }else{
                message.error('亲！用户名已经被注册了',1);
            }


        } catch (err) {
            console.log(err);
        }
    }
    change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { user, pwd } = this.state
        return (
            <div className="reg">
                <div className="regbox">
                    <div className="regtitle">
                        <i className="iconfont icon-jiantou9" onClick={this.gotomine}></i>
                        <span>注册</span>
                    </div>
                    <div className="username"><input type="text" placeholder="请输入账号" value={user} id="user" onChange={this.change} onBlur={this.checkup}/></div>
                    <div className="password"><input type="text" placeholder="请输入密码" value={pwd} id="pwd" onChange={this.change} /></div>
                    <div className="btn">
                        {
                            user&&pwd != ""?<button onClick={this.gotoLogin} className="bb">下一步</button>:<button onClick={this.gotoLogin} className="aa">下一步</button>
                        }
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}