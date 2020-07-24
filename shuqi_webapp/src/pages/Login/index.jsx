import React, { Component } from 'react'

import "./login.scss"
import {Checkbox} from "antd-mobile"
import LoginApi from "../../api/loginwreg"
import {message} from 'antd'
const CheckboxItem = Checkbox.CheckboxItem;
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            psw: '',
            keep:false,
            name:'奇妙能力寒丶'
        }
        this.loginto = this.loginto.bind(this)
    }
    gotoreg = () => {
        let { history } = this.props
        history.push('/reg')
    }
    change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    async loginto(){
        const {user,psw,keep,name} = this.state
        let { history } = this.props
       let p = await LoginApi.loginuser(user,psw,keep)
       console.log(p);
       if(p.flag == true){
        message.success("登录成功",1)
        localStorage.setItem("shuqiuser",user)
        localStorage.setItem("shuiqitoken",p.data.token)
        localStorage.setItem("shuiqiname",name)
        history.push('/home')
       }else{
        message.error("登录失败",1)
       }
    }
    changebox = ()=>{
        // console.log(checked);
        const{keep} = this.state
        this.setState({
            keep:!keep
        })
    }
    render() {
        const { user, psw,keep } = this.state
        return (

            <div className="login">

                <div className="titlewrap">
                    <img src="https://img-tailor.11222.cn/cms/upload/img/1584005271938icon-shuqi.png" alt="" />
                    
                    <p>
                        <span onClick={this.gotoreg}>注册</span>
                                &nbsp;
                                 <span>/</span>
                                 &nbsp;
                        <span>找回密码</span>
                    </p>
                </div>

                <div className="fromWrap">
                    <div className="username"><input type="text" placeholder="请输入账号" id="user" onChange={this.change} /></div>
                    <div className="password"><input type="text" placeholder="请输入密码" id="psw" onChange={this.change} /></div>
                    <div className="ckbox">
                     <Checkbox onChange={this.changebox} checked={keep}></Checkbox>
                     <span>七天免登录</span>
                        
                    </div>
                    <div className="btn">{
                        user && psw != "" ?
                            <button className="aa" onClick={this.loginto}>登录</button>
                            : <button className="bb" onClick={this.loginto}>登录</button>

                    }</div>
                    <div className="thirdLoginArea">
                        <div className="row">
                            <span className="line"></span>
                            <span className="text">使用以下可免注册</span>
                            <span className="line"></span>
                        </div>
                        <div className="iconWraper">
                            <img src="https://img-tailor.11222.cn/cms/upload/img/1593312939476QQ.png" alt="" />
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}