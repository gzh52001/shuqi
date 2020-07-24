import React, { Component } from 'react'
import PageLayout from '../../layout/PageLoyout'
import { SearchBar, Flex } from 'antd-mobile';


//请求api
import homeApi from '../../api/homeApi'


import './home.scss'

export default class Home extends Component {
    state = {
        aaa: false,
        dataList: [],//首页请求的数据
        relevantData: null,//换一换数据
        rid: null //当前小说的类型id
    };
    //搜索栏
    search = () => {
        this.props.history.push('/searchs')
    }
    //大图跳转
    imgData = () => {
        let obj = {
            actionType: "book",
            author: "真爱小未凉",
            bid: "7074416",
            bookCover: "http://img-tailor.11222.cn/bcv/big/1121637074416.jpg",
            bookName: "锦绣凰途：毒医太子妃",
            cache: true,
            chargeMode: "3",
            desc: "前世，她女扮男装，浴血沙场，杀戮漫天，助他称帝，只为和他长相厮守。↵他淡泊名利，潜藏野心，为夺帝位，他以情诱之。↵她美人蛇蝎，恶毒伪善。↵大局初定，她没了用处，他们联手置她于死地！↵他们大婚当日，她在血泊中立下血咒。↵含恨而亡，重生回到八年前。↵这一世，她以女子身份示人，斗嫡母，惩恶姐，虐渣男……↵誓要与他们，与这赤宇天下纠缠到底，不死不休！↵逆天改命，改的又岂止她一个人的命！",
            price: "0.6",
            readFeatureOpt: "0",
            tags: ["爽文", "重生", "女强", "腹黑"],
            wordCount: "2850000"
        }
        this.particulars(obj)
    }
    async componentDidMount() {
        //首页数据请求
        try {
            const datas = await homeApi.GetBook()
            const dataLi = datas.data.data.models
            // console.log(dataLi);
            // console.log('刷新');
            this.setState({
                dataList: dataLi,
                relevantData: null
            })
        } catch (err) {
            console.log(err);
        }
    }
    particulars = (item) => {
        this.props.history.push({
            pathname: '/particulars',
            state: item
        })//跳转详情页面
        // console.log('首页',item);
    }
    //换一换功能
    async change2(id) {
        try {
            const datas = await homeApi.GetRelevant(id)
            const reData = datas.data.data.model.data.items
            let arr = this.state.dataList
            arr.forEach(item => item.id === id ? item.items = reData : null)
            if (!this.state.rid || id === this.state.rid) {
                this.setState({
                    relevantData: reData,
                    rid: id,
                })
            } else {
                this.setState({
                    relevantData: null,
                    rid: id,
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        let { dataList, relevantData, rid } = this.state
        return (
            <PageLayout>
                <div className="maxhome">


                    <div className="home">
                        <div onClick={this.search} className="search-bar">
                            <SearchBar placeholder="请输入书名或作者名" disabled />
                        </div>

                        <div className="inner" onClick={this.imgData}>
                            <img src="//img-tailor.11222.cn/pm/book/operate/2020071416365241.png
" alt="" />
                        </div>

                        <div className="stencil">
                            <div className="navi-bar">
                                <Flex>
                                    <Flex.Item align="center">
                                        <img src="http://img-tailor.11222.cn/cms/upload/img/1585834084630b2975e1d61e0b687f34c5bc2d21e2604.png" alt="" />
                                        <p>女生</p>
                                    </Flex.Item>
                                    <Flex.Item align="center">
                                        <img src="http://img-tailor.11222.cn/cms/upload/img/15858340654071f229d42d44ffb6507da77d1365ab6c1.png" alt="" />
                                        <p>男生</p>
                                    </Flex.Item>
                                </Flex>
                            </div>
                        </div>
                        {/* 横向列表-男频主编辑 */}
                        {
                            dataList[3] ?
                                <div className="st-module">
                                    <p className="titlebar">{dataList[3].title}</p>
                                    <div className="book-list-n">
                                        {
                                            dataList[3].data.items.map(item => (
                                                <div className="items" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {/* 横向列表-男频主编辑 end */}

                        {/* 横向列表-女频主编辑 */}
                        {
                            dataList[4] ?
                                <div className="st-module">
                                    <p className="titlebar">{dataList[4].title}</p>
                                    <div className="book-list-n">
                                        {
                                            dataList[4].data.items.map(item => (
                                                <div className="items" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {/* 横向列表-女频主编辑 end */}

                        {/* 纵向列表-男生爽文 */}
                        {
                            dataList[5] ?
                                <div className="stencil_2">
                                    <div className="titlebar">
                                        <span className="left">{dataList[5].title}</span>
                                        <span className="right" onClick={this.change2.bind(this, dataList[5].id)}>换一换</span>
                                    </div>
                                    <div className="book-list">
                                        {
                                            // relevantData?relevantData:dataList[5].data.items
                                            (relevantData && rid === dataList[5].id ? relevantData : dataList[5].data.items).map(item => (
                                                <div className="book-item-a" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <div className="book-cover">
                                                        <img src={item.bookCover} alt="" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="info_top">{item.bookName}</div>
                                                        <div className="info_con">{item.desc}</div>
                                                        <div className="ext">
                                                            <span className="ext_left">{item.author}</span>
                                                            <span className="ext_right">{item.tags[0]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                                : null
                        }

                        {/* 纵向列表-男生爽文 end */}

                        {/* 纵向列表-女生畅销 */}
                        {
                            dataList[6] ?
                                <div className="stencil_2">
                                    <div className="titlebar">
                                        <span className="left">{dataList[6].title}</span>
                                        <span className="right" onClick={this.change2.bind(this, dataList[6].id)}>换一换</span>
                                    </div>
                                    <div className="book-list">
                                        {
                                            (relevantData && rid === dataList[6].id ? relevantData : dataList[6].data.items).map(item => (
                                                <div className="book-item-a" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <div className="book-cover">
                                                        <img src={item.bookCover} alt="" />
                                                    </div>
                                                    <div className="info">
                                                        <div className="info_top">{item.bookName}</div>
                                                        <div className="info_con">{item.desc}</div>
                                                        <div className="ext">
                                                            <span className="ext_left">{item.author}</span>
                                                            <span className="ext_right">{item.tags[0]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                                : null
                        }
                        {/* 纵向列表-女生畅销 end */}

                        {/* 横向列表-男频最新爆款 */}
                        {
                            dataList[7] ?
                                <div className="st-module">
                                    <p className="titlebar">{dataList[7].title}<span className="right" onClick={this.change2.bind(this, dataList[7].id)}>换一换</span></p>

                                    <div className="book-list-n">
                                        {
                                            (relevantData && rid === dataList[7].id ? relevantData : dataList[7].data.items).map(item => (
                                                <div className="items" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {/* 横向列表-男频最新爆款 end */}

                        {/* 横向列表-女频最新红文 */}
                        {
                            dataList[8] ?
                                <div className="st-module">
                                    <p className="titlebar">{dataList[8].title}<span className="right" onClick={this.change2.bind(this, dataList[8].id)}>换一换</span></p>
                                    <div className="book-list-n">
                                        {
                                            (relevantData && rid === dataList[8].id ? relevantData : dataList[8].data.items).map(item => (
                                                <div className="items" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {/* 横向列表-女频最新红文 end */}

                        {/* 横向列表-男频完结精品 */}
                        {
                            dataList[9] ?
                                <div className="st-module">
                                    <p className="titlebar">{dataList[9].title}<span className="right" onClick={this.change2.bind(this, dataList[9].id)}>换一换</span></p>
                                    <div className="book-list-n">
                                        {
                                            (relevantData && rid === dataList[9].id ? relevantData : dataList[9].data.items).map(item => (
                                                <div className="items" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {/* 横向列表-男频完结精品 end */}

                        {/* 横向列表-女频完结精品 */}
                        {
                            dataList[10] ?
                                <div className="st-module">
                                    <p className="titlebar">{dataList[10].title}</p>
                                    <div className="book-list-n">
                                        {
                                            dataList[10].data.items.slice(0, 3).map(item => (
                                                <div className="items" key={item.bid} onClick={this.particulars.bind(this, item)}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="book-list-n">
                                        {
                                            dataList[10].data.items.slice(3).map(item => (
                                                <div className="items" onClick={this.particulars.bind(this, item)} key={item.bid}>
                                                    <img className="book-cover" src={item.bookCover} alt="" />
                                                    <div className="book-info">
                                                        <p className="book-name">{item.bookName}</p>
                                                        <p className="author-name">{item.author}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null
                        }
                        {/* 横向列表-女频完结精品 end */}

                        {/* 底部 */}
                        <div className="loading-more">
                            <div className="bottominfo">
                                <span className="bottominfo_bor"></span>
                                <span className="bottominfo_txt">阿里文学出品</span>
                                <span className="bottominfo_bor"></span>
                            </div>
                        </div>
                        {/* 底部 end */}

                    </div>


                </div>
            </PageLayout>

        )
    }
}