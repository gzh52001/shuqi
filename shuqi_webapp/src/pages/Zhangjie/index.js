import React, { Component } from 'react'

import ZhangjieApi from "../../api/ZhangjieApi"

import {Progress} from "antd"


import "./zhangjie.scss"
export default class zhangjie extends Component {
    constructor() {
        super()
        this.state = {
            Content: "",
            head: "",
            i:0,
            step:10,
            flag:false
        }
        this.right = this.right.bind(this)
        this.left = this.left.bind(this)
    }
    async componentDidMount() {
        let p = await ZhangjieApi.getZhangjie(1, 10)
        // console.log(p.data[0].Content.split("。"))
        const {i} = this.state
        
        this.setState({
            Content: p.data[i].Content,
            head: p.data[i].SectionName
        })
       
    }
    getTop=()=>{
        document.documentElement.scrollTop = 0
    }
   async right(){
        const {i,step} = this.state
        let p = await ZhangjieApi.getZhangjie(1, 10)
        // console.log(p);
        if(i<9&&p.flag==true){
           var pi = i+1
           this.setState({
            i:pi,
            Content: p.data[pi].Content,
            head: p.data[pi].SectionName,
            step:step+10
        })
       this.getTop()
}
        
       
        // console.log(1);
    }
   async left(){
        const {i,step} = this.state
        let p = await ZhangjieApi.getZhangjie(1, 10)
        if(i>0&&p.flag==true){
            var pi = i-1
         }

        if(i>0){
            this.setState({
                i:pi,
                Content: p.data[pi].Content,
                head: p.data[pi].SectionName,
                step:step-10
            })
        }
        this.getTop()
       
    }
    bottom=()=>{
        this.setState({
            flag:true
        })
    }
    render() {
        const { Content, head,step ,flag} = this.state
        return (
            <div className="zhangjiebox">

                <p className="header-box">{head}</p>
                <div className="c-box">
                    {
                        Content
                    }
                </div>
                <div className="right" onClick={this.right}></div>
                <div className="left" onClick={this.left}></div>
                <div className="bottom" onDoubleClick={this.bottom}></div>
                 
                 {
                     flag?<div className="choosebox">
                         小垃圾
                     </div>:""
                 }

                <Progress percent={step} />

        
            </div>
        )
    }
}
