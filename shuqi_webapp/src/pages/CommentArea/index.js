import React, { Component } from 'react';
import { NavBar, Icon, Modal, List, Button, TextareaItem } from 'antd-mobile';

// 引入api
import particularsApi from '../../api/particularsApi'
import CartlistAPi from "../../api/Cartlist"

//引入样式
import './CommentArea.scss'

class CommentArea extends Component {
    state = {
        novelData: this.props.location.state.novelData,//小说数据
        totals: this.props.location.state.totals,//评论总条数
        uid: this.props.location.state.uid,//当前小说id
        size: 1000,//显示条数（默认）
        page: 1,//页码
        comList: null,//评论数据列表
        modal2: false,//评论对话框的显示开关
        num: 0,//点赞+1
        txts: ["2"],//点赞当前的内容
        values: '',//添加评论的内容
        mid: localStorage.getItem('shuqiuser'),
        nickName: localStorage.getItem('shuiqiname')
    }
    componentDidMount() {
        // console.log(this.props.location);
        this.getComs()
        // this.addData()
        // this.removeCom()
        // this.getda()
    }
    //评论数据请求,自己的数据库
    async getComs() {
        // if(page)
			// console.log(this.state.size)
        try {
            let p = await particularsApi.getComment(this.state.size, this.state.page)
            // let a = p.data.data.reverse()
            p.data.data.forEach(item => {
                item.pubTime = this.formatTime(item.pubTime, '.', true)
            })
            
            // console.log(p.data.data.reverse());
            this.setState({
                comList: p.data.data,
                totals:p.data.data.length,
                size:p.data.data.length
            })
        } catch (err) { console.log(err); }
    }
    //时间戳转换
    formatTime = (timestamp, separator = '-', flag = false, timeS = ':') => {
        let str = '';
        let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + separator;
        let M = this.autoChange(date.getMonth() + 1) + separator; //计算机的月份是从0开始滴，需要+1
        let D = this.autoChange(date.getDate());
        str = Y + M + D;
        if (flag) {
            let h = this.autoChange(date.getHours()) + timeS;
            let m = this.autoChange(date.getMinutes()) + timeS;
            let s = this.autoChange(date.getSeconds());
            let timeStr = h + m + s;
            str += " ";
            str += timeStr;
        }
        return str;
    }
    autoChange = (num) => {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    //点赞
    async six66(txt) {
        let { txts } = this.state
        if (!txts.some(item => item === txt)) {
            //未点赞过
            try {
                let p = await particularsApi.putNum(txt)
                if (p.data.flag) {
                    this.getComs()
                }
            } catch (err) { }
        }
    }

    //写评论，弹窗对话框
    addCom = () => {
        // console.log('写评论');
        this.setState({
            modal2: true
        })
    }
    //对话框关闭
    onClose = key => (mask) => {
        // console.log('mask ', mask);
        this.setState({
            [key]: false,
        });
        // let val = this.refs.newitem.nodeValue
        // console.log(val);
    }
    // 写评论的多行文本输入内容
    aaa = () => {
        let asd = document.getElementById("aaabbb").value;
        this.setState({
            values: asd
        })
    }
    //写评论确定按钮
    determine = () => {
        // console.log(this.state.nickName);
        if (this.state.nickName) {
            this.addData()
        } else {
            this.props.history.push({
                pathname: '/login'
            })
        }
    }
    //添加评论  
    async addData() {
        // console.log("时间戳",Math.floor(Date.now()/1000));
        try {
            let p = await particularsApi.addComt(
                this.state.mid,
                this.state.nickName,
                this.state.values,
                Math.floor(Date.now() / 1000)
            )
            // console.log(this.state.totals);
            if (p.data.flag) {
                // console.log(this.state.values);
                this.setState({
                    modal2: false,
                    size:this.state.size+1
                })
                this.getComs()
            }
        } catch (err) { }
    }
    //查询
    // async removeCom(){
    //     let sss = '555'
    //     try {
    //         let p = await particularsApi.removeComt(sss)

    //     } catch (err) {}
    // }
    //删除评论：接口测试
    // async getda(){
    //     let aa = '佛爷'
    //     try {
    //         let p = await particularsApi.getsss(aa)
    //         console.log(p);
    //     } catch (err) {}
    // }

    render() {
        const { comList, novelData, num, values, mid } = this.state
        // console.log("多行输入内容", values);
        // console.log("用户名", mid);
        // console.log('未颠倒',comList);
        // console.log('颠倒',comList.reverse());
        return (
            <div id="aommentarea">
                <div className="aommentarea-con">
                    {/* 导航栏 */}
                    <div id="Navigations">
                        <NavBar
                            mode="light"
                            icon={<Icon type="left" />}
                            onLeftClick={() => this.props.history.goBack()}
                        >评论区</NavBar>
                    </div>
                    {/* 导航栏end */}

                    {/* 小说大图 */}
                    <div className="bookCon">
                        <div className="bookimg"></div>
                        <div className="book">
                            <img src={novelData.bookCover} alt="" />
                            <p>{novelData.bookName}</p>
                        </div>
                    </div>
                    {/* 小说大图 */}

                    {/* 评论内容 */}
                    <div id="circle">
                        <p>书友圈</p>
                    </div>
                    {
                        comList ?
                            <div className="cover-comment">
                                {
                                    comList.map((item, index) => (
                                        <div className="comment-item" key={index}>
                                            <div className="thumb">
                                                <img src="http://img-tailor.11222.cn/pm/book/operate/2020041616331364.png" alt="" />
                                            </div>
                                            <div className="main">
                                                <div className="name">{item.nickName}</div>
                                                <div className="cmttext">{item.text}</div>
                                                <div className="info">
                                                    <div className="t">{item.pubTime}</div>
                                                    <div className="d">
                                                        <div className="c">
                                                            <i className="iconfont icon-xinxi"></i>
                                                            <span>{item.replyNum}</span>
                                                        </div>
                                                        <div className="z" onClick={this.six66.bind(this, item.text)}>
                                                            <i className="iconfont icon-dianzan"></i>
                                                            <span>{Number(item.zanNum) + num}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            : null
                    }
                    {/* 评论内容end */}

                    {/* 写书评 */}
                    <div className="writeTxt">
                        <p onClick={this.addCom}>写评论</p>
                    </div>
                    {/* 写书评end */}

                    {/* 写书评对话框 */}
                    <Modal
                        popup
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        animationType="slide-up"
                    >
                        <form>
                            <List renderHeader={() => <div>写评论</div>} className="popup-list"></List>
                            <List.Item>
                                {/* <List> */}
                                <TextareaItem
                                    id="aaabbb"
                                    rows={5}
                                    count={100}
                                    ref='newitem'
                                    onChange={this.aaa}
                                />
                                {/* </List> */}
                            </List.Item>
                            <List.Item >
                                <Button type="primary" onClick={() => this.determine()}>确认</Button>
                            </List.Item>
                        </form>
                    </Modal>
                    {/* 写书评对话框end */}

                </div>
            </div >
        );
    }
}

export default CommentArea;