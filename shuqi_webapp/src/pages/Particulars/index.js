import React, { Component } from 'react';
import { Flex, Icon } from 'antd-mobile';

// 引入api
import particularsApi from '../../api/particularsApi'
import CartlistAPi from "../../api/Cartlist"

import Cartlist from "../../api/Cartlist"

import { connect } from 'react-redux'
//引入样式
import './Particulars.scss'

import store from "../../store"

// redux 写法
// store.subscribe(function(){
//     console.log('修改',JSON.stringify(store.getState()));
// })



// const state = store.getState()
// console.log('state',state);
// console.log(store);
class Particulars extends Component {
    constructor(){
        super()
        this.addBook = this.addBook.bind(this)
    }
    state = {
        ibook: false, //是否已加入书架(Booleans)
        novelData: [],//小说数据
        relevantData: [],//相关推荐数据
        uid: '', //当前小说id
        comData: null,//当前小说评论的数据
        totals: '',
        isok:false,
        bookNamess: null,//当前小说名
    }

   
    componentDidMount() {
        // console.log("已加入");
        //对应小说的数据
        this.setState({
            novelData: this.props.location.state,
            uid: this.props.location.state.bid,
            ibook: false
        })
        
        //相关推荐请求
        this.requestDa()
        //评论数据请求
        this.getCom()
        this.daList()
    }
    //书架数据获取
    async daList () {
        this.setState({
            ibook:false
        })
        // console.log(this.props.location.state.bookName);
        this.setState({
            bookNamess:this.props.location.state.bookName
        })
        let p = await CartlistAPi.Getcarlist(1, 10)
        // console.log("一开始3",this.state.bookNamess, p.data);
        p.data.forEach(item=>{
            // console.log('sss',item.bookName);
            if(item.bookName===this.state.bookNamess){
                // console.log('已加入');
                this.setState({
                    ibook:true
                })
            }else{
                // this.setState({
                //     ibook:false
                // })
            }
        })
        // let ccc = p.data.every(item=>item.bookName== this.state.bookName)
        // console.log(ccc);
        // if(!ccc|| p===[]) {
        //     console.log("22222");
        // }
        // this.setState({
        //     Cartlist: p.data,
        //     i:0,
        //     flag:true
        // })
    }
    //评论数据请求
    async getCom() {
        // try {
        //     let p = await particularsApi.getComment3(this.props.location.state.bid)
        //     p.data.data.forEach(item => {
        //         item.pubTime = this.formatTime(item.pubTime, '.', true)
        //     })
        //     // console.log(p);
        //     this.setState({
        //         comData: p.data.data,
        //         totals: p.data.info.total
        //     })
        // } catch (err) { console.log(err); }
        try {
            let p = await particularsApi.getComment(1000,1)
            // let a = p.data.data.reverse()
            p.data.data.forEach(item => {
                item.pubTime = this.formatTime(item.pubTime, '.', true)
            })
            
            // console.log(p.data.data.reverse());
            this.setState({
                comData: p.data.data.slice(0,3),
                totals:p.data.data.length
            })
            // this.setState({
            //             comData: p.data.data,
            //             totals: p.data.info.total
            //         })
        } catch (err) { console.log(err); }
    }
    //相关相关推荐请求
    async requestDa() {
        try {
            const datas = await particularsApi.GetRelevant()
            const dataLi = datas.data.data.model.data.items
            this.setState({
                relevantData: dataLi
            })
        } catch (err) {
            console.log(err);
        }
    }
    //点击相关推荐重新渲染详情 
    particulars2 = (item) => {
        // console.log('详情', item);
        this.setState({
            novelData: item
        })
        this.props.history.push({
            pathname: '/particulars',
            state: item
        })//跳转详情页面
        this.props.history.go(0)
    }
    //换一换功能
    change = () => {
        // console.log('..');
        this.requestDa()
    }
    // 添加书架按钮
   async addBook ()  {
       if(!this.state.ibook){
        this.setState({
            ibook: true
        })
       }
        

        const { novelData ,ibook} = this.state;
        const { bid, bookName, bookCover } = novelData

        // react-redux 写法
        const { dispatch,bookList} = this.props
        // console.log(bookList);

        //判断当前是否已经添加到购物车
        //已添加：不能再加
        //未添加：添加
        // console.log(bookList.filter(item=>item.bid == bid))
        const currentbook = bookList.filter(item=>item.bid === bid)[0]
        if(currentbook){
            return;
        }else{
            let p = await Cartlist.Getcar(bookName,bookCover,bid,0)
            // console.log(p);
            dispatch({
                type: 'add_to_book',
                books: {
                    bid, bookName, bookCover,
                    checked: false,
                    
                }
            })
        }
            
        
        

        //redux 写法
        //  store.dispatch({
        //      type:'add_to_book',
        //      books:{
        //         bid,bookName,bookCover,
        //         checked:false
        //      }
        //  })

        // console.log('添加');
        // this.props.history.push({
        //     pathname: '/car',
        //     state: novelData
        // })//跳转详情页面

    }
    // 开始阅读、最新章
    readBook = () => {
        // console.log('点击了开始阅读或最新章');
        // 跳转阅读页
        this.props.history.push({
            pathname: '/zhangjie',
            // state: ''
        })
    }
    //目录
    catalog = () => {
        // console.log('打开了目录');
        // 跳转目录页
        // this.props.history.push({
        //     pathname: '/bbb',
        //     state: ''
        // })
    }
    // 写评论
    addComment = () => {
        // console.log('写评论');
    }
    //查看全部评论
    comments = () => {
        this.props.history.push({
            pathname: '/CommentArea',
            state: {
                totals: this.state.totals,
                uid: this.props.location.state.bid,
                novelData: this.state.novelData
            }
        })//跳转评论区
        // console.log('查看全部评论');
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
        // return console.log(str);
    }
    autoChange = (num) => {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    render() {
        let { novelData, relevantData, ibook, comData } = this.state
        // console.log('app-props', this.props);
        // console.log(novelData);
        // console.log("ibook",ibook);
        // console.log('评论数据', comData);
        return (
            <>
                {
                    novelData ?
                        <div className="Particulars">
                            {/* 加书架、开始阅读 */}
                            <Flex>
                                <Flex.Item align="center">
                                    {
                                        ibook ?
                                        <button className={ibook ? "active-3" : "active-1"}>已加书架</button>
                                        :<button className={ibook ? "active-3" : "active-1"} onClick={this.addBook}>加书架</button>
                                    }
                                    {/* <button className={ibook ? "active-3" : "active-1"} onClick={this.addBook}>{ibook ? "已加书架" : "加书架"}</button> */}
                                </Flex.Item>
                                <Flex.Item align="center">
                                    <button onClick={this.readBook} className="active-2" >开始阅读</button>
                                </Flex.Item>
                            </Flex>
                            {/* 加书架、开始阅读end */}
                            <div className="cover-page">

                                <div className="cover-page_view">
                                    {/* 顶部 */}
                                    <div className="cover-info">
                                        <div className="cover">
                                            <img src={novelData.bookCover} alt="" />
                                        </div>
                                        <div className="info">
                                            <div className="p-t">
                                                <p className="bname">{novelData.bookName}</p>
                                                <p className="aname">{novelData.author}</p>
                                                <p></p>
                                            </div>
                                            <div className="p-b">
                                                <span>连载</span>
                                                <span>{Math.floor(novelData.wordCount / 10000)}万字</span>
                                                <span>0.6书豆/千字</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 顶部 end */}

                                    {/* 内容简介 */}
                                    <div className="titlebar">
                                        <p>内容简介</p>
                                    </div>
                                    <div className="cover-desc">
                                        {/* 收缩展示效果没写 */}
                                        <p className="cover-desc_1">
                                            {novelData.desc}
                                            {/* <Icon color='#999' size='xs' className="cover-desc_icon" type='down' /> */}
                                        </p>
                                    </div>
                                    {/* 内容简介end */}

                                    {/* 标签 */}
                                    <div className="cover-tags">
                                        {
                                            novelData.tags ?
                                                novelData.tags.map(item => <span key={item}>{item}</span>)
                                                : null
                                        }
                                    </div>
                                    {/* 标签end */}

                                    {/* 最新章 + 目录 */}
                                    <div className="config-item">
                                        <p>最新</p>
                                        <div className="config-item-text" onClick={this.readBook}>
                                            <span className="icon-text">第一千二百一十四章  伤口感染了伤口感染了</span>
                                            <Icon type='right' color="#999" size="14px" />
                                        </div>
                                    </div>

                                    <div className="config-item" onClick={this.catalog}>
                                        <p>目录</p>
                                        <div className="config-item-text">
                                            <span className="icon-text">共2467章</span>
                                            <Icon type='right' color="#999" size="14px" />
                                        </div>
                                    </div>
                                    {/* 最新 + 目录end */}

                                    {/* 评论标题、写评论 */}
                                    <div className="comment">
                                        <div className="left">评论</div>
                                        {/* <div className="right" onClick={this.addComment}>写评论</div> */}
                                    </div>
                                    {/* 评论标题end */}

                                    {/* 评论内容 */}
                                    {
                                        comData ?
                                            <div className="cover-comment">
                                                {
                                                    comData.map(item => (
                                                        <div className="comment-item" key={item.pubTime}>
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
                                                                            <span>{item.zanNum}</span>
                                                                        </div>
                                                                        <div className="z">
                                                                            <i className="iconfont icon-dianzan"></i>
                                                                            <span>{item.replyNum}</span>
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

                                    {/* 查看全部评论 */}
                                    <button className="active" onClick={this.comments}>查看全部评论</button>
                                    {/* 查看全部评论end */}

                                    {/* 相关推荐 */}
                                    <div className="st-module">
                                        <p className="titlebar">相关推荐<span className="right" onClick={this.change}>换一换</span></p>
                                        {
                                            relevantData ?
                                                <div className="book-list-n">
                                                    {
                                                        relevantData.map(item => (
                                                            <div className="items" key={item.bid} onClick={this.particulars2.bind(this, item)}>
                                                                <img className="book-cover" src={item.bookCover} alt="" />
                                                                <div className="book-info">
                                                                    <p className="book-name">{item.bookName}</p>
                                                                    <p className="author-name">{item.author}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                                : null
                                        }

                                    </div>
                                    {/* 相关推荐end */}

                                    {/* 图书信息 */}
                                    <div className="titlebar_1">
                                        <p>图书信息</p>
                                    </div>

                                    <div className="cover-copyright_1">
                                        <dl>
                                            <dt>版权来源</dt>
                                            <dd>书旗小说</dd>
                                        </dl>
                                        <dl>
                                            <dt>免责声明</dt>
                                            <dd>本书数字版权由原创版权提供，授权本软件使用、制作、发行，若包含不良信息，请及时告知客服。</dd>
                                        </dl>
                                    </div>
                                    {/* 图书信息end */}

                                </div>
                            </div>
                        </div>
                        : null
                }
            </>

        );
    }
}


const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        bookList: state.bookList
    }
}

Particulars = connect(mapStateToProps)(Particulars)
export default Particulars;