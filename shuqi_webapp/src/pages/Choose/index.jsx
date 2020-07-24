import React, { Component } from 'react'
import PageLayout from '../../layout/PageLoyout'
import "./Choose.scss"
import Booklist from "../../api/getBooklist"
export default class Choose extends Component {
    constructor() {
        super()
        this.state = {
            title: ["男生", "女生"],
            curr: 0,
                    boylist: [{
                        name: "都市",
                        tags: '生活/异能',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318311993.png',
                        type: 'city'
                    }, {
                        name: "玄幻",
                        tags: '东方玄幻',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318312724.png',
                        type: 'xuanhuan'
                    }, {
                        name: "仙侠",
                        tags: '现代修真',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318313555.png',
                        type: 'xiangxia'
                    }, {
                        name: "灵异",
                        tags: '灵异鬼怪',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318314338.png',
                        type: 'lingyi'
                    }, {
                        name: "历史",
                        tags: '架空历史',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318315165.png',
                        type: 'lishi'
                    }, {
                        name: "游戏",
                        tags: '虚拟网游',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318320558.png',
                        type: 'youxi'
                    }, {
                        name: "科幻",
                        tags: '未来世界',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318321490.png',
                        type: 'kehuan'
                    }, {
                        name: "武侠",
                        tags: '传统武侠',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318322238.png',
                        type: 'wuxia'
                    }, {
                        name: "奇幻",
                        tags: '西方奇幻',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318322966.png',
                        type: 'qihuan'
                    }, {
                        name: "竞技",
                        tags: '电子竞技',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318323615.png',
                        type: 'jinji'
                    }, {
                        name: "其他",
                        tags: '动漫/影视',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318324274.png',
                        type: 'qita'
                    }], 
                  girllist: [{
                        name: "现言",
                        tags: '总裁/虐恋',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410776.png',
                        type: 'xianyan'
                    }, {
                        name: "古言",
                        tags: '代嫁/宫廷',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715442621.png',
                        type: 'guyan'

                    }, {
                        name: "穿越",
                        tags: '冰山王爷',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410724.png',
                        type: 'chuangyue'
                    }, {
                        name: "豪门",
                        tags: '豪门恩怨',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410745.png',
                        type: 'haomen'
                    }, {
                        name: "幻言",
                        tags: '女主仙侠',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410790.png',
                        type: 'huanyan'
                    }, {
                        name: "校园",
                        tags: '校草校花',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318291946.png',
                        type: 'xiaoyuan'
                    }, {
                        name: "架空",
                        tags: '魔女/架空女贼',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410700.png',
                        type: 'jiakong'
                    }, {
                        name: "都市",
                        tags: '生活/异能',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2017091318311993.png',
                        type: 'doushi'
                    }, {
                        name: "宫斗",
                        tags: '宫廷斗争',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715440610.png',
                        type: 'gongdou'
                    }, {
                        name: "青春",
                        tags: '纯爱/宝宝',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410736.png',
                        type: 'qincun'
                    }, {
                        name: "仙侣",
                        tags: '修真/仙侠',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715435853.png',
                        type: 'xianlu'
                    }, {
                        name: "女尊",
                        tags: '女强/宿世情缘',
                        image: 'http://img-tailor.11222.cn/pm/book/operate/2018020715410703.png',
                        type: 'nvzhun'
                    }]
           

            
        }
        this.gotolist = this.gotolist.bind(this)
    }
    change = (i) => {
        const { curr } = this.state
        // console.log(i);
        this.setState({
            curr: i
        })
    }
     gotolist(type){
            const {history} = this.props
            // console.log(type);
            // let p = await Booklist.getBook(type)
            // console.log(p);
          history.push("/choose/"+type)
       
    }
    render() {
        const { title, curr, boylist,girllist } = this.state
        return (
            <PageLayout>
                <div className="tabs">
                    <div className="tabs-header">
                        {
                            title.map((item, index) => (
                                <span key={index} className={curr == index ? 'active' : ''} onClick={this.change.bind(this, index)}>{item}</span>
                            ))
                        }

                    </div>
                    <div className="box-list">
                        {
                           
                            boylist.map((item, index) => (

                                <div className="boy-item" key={index} style={{ display: curr == 0 ? "block" : 'none' }} onClick={this.gotolist.bind(this,item.type)}>
                                    <div className="box-item">
                                        <div className="box-info">
                                            <p className="one">{item.name}</p>
                                            <p className="two">{item.tags}</p>
                                        </div>
                                        <div className="cover">
                                            <img src={item.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            girllist.map((item, index) => (

                                <div className="boy-item" key={index} style={{ display: curr == 1 ? "block" : 'none' }} onClick={this.gotolist.bind(this,item.type)}>
                                    <div className="box-item">
                                        <div className="box-info">
                                            <p className="one">{item.name}</p>
                                            <p className="two">{item.tags}</p>
                                        </div>
                                        <div className="cover">
                                            <img src={item.image} alt="" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </PageLayout>
        )
    }
}