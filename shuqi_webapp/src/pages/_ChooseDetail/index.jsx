import React, { Component } from 'react'


import getfuck from "../../api/getBooklist"

import "./ChooseD.scss"

export default class _ChooseDetail extends Component {
    constructor() {
        super()
        this.state = {
            BookList: [],
            title: ["最新", "最热"],
            curr: 0,
            HotList: [],
            flag: true,
            tre: true
        }
        this.getTop = this.getTop.bind(this)
    }
    componentWillMount() {
        document.documentElement.scrollTop = 0
    }


    async componentDidMount() {

        const Type = this.props.match.params.type

        let p = await getfuck.getfuck(1, 10, Type)
        //    console.log(p.data);
        this.setState({
            BookList: p.data,

        })
        // console.log(this.state.isscroll);
        window.addEventListener('scroll', this.getTop)


    }



    async getTop(e) {
        //    console.log(1);
        let scrollTop = (e.srcElement ? e.srcElement.documentElement.scrollTop : false) || window.pageYOffset || (e.srcElement ? e.srcElement.body.scrollTop : 0);
        console.log(scrollTop);

        const { BookList, HotList, flag, tre } = this.state
        const Type = this.props.match.params.type

        if (Math.floor(scrollTop) == 700 && flag == true ) {
            
            
            let res = await getfuck.getfuck(2, 10, Type)
            // console.log(p);


            let p = await getfuck.Hotfuck(2, 10, Type)
            
           
            this.setState({
                BookList: [...BookList, ...res.data],
                HotList: [...HotList, ...p.data],
                flag: false
            })
            document.documentElement.scrollTop =  699
        }

        if (Math.floor(scrollTop) > 2556 && tre == true ) {

            let res = await getfuck.getfuck(3, 2, Type)
            // console.log(p);


            let p = await getfuck.Hotfuck(3, 10, Type)
            this.setState({
                BookList: [...BookList, ...res.data],
                HotList: [...HotList, ...p.data],
                tre: false
            })
            document.documentElement.scrollTop = 2600
        }

    }


    change = (i) => {
        const { HotList } = this.state
        const Type = this.props.match.params.type
        // console.log(i);
        this.setState({
            curr: i
        })
        if (i == 1) {
            // console.log(1);
            getfuck.Hotfuck(1, 10, Type).then(res => {
                this.setState({
                    HotList: res.data
                })

            })

        }
    }


    gotoD = (item) => {
        // console.log(item);
        let arr = {
            actionType: "book",
            author: item.Author,
            bid: item.uid,
            bookCover: item.image,
            bookName: item.Bookname,
            cache: true,
            chargeMode: "3",
            desc: item.introduce,
            price: "0.6",
            readFeatureOpt: "0",
            tags: item.tags.split(','),
            wordCount: "1707753"
        }
        // console.log(arr);
        this.props.history.push({
            pathname: '/particulars',
            state: arr
        })//跳转详情页面
        // const { history } = this.props
        // history.push({
        //     pathname: '/detail',
        //     state: item
        // })
    }
    render() {

        const { BookList, title, curr, Top, HotList } = this.state
        document.documentElement.scrollTop = Top
        return (
            <div className="book-list" >
                <div className="tabs-header">
                    {
                        title.map((item, index) => (
                            <span key={index} className={curr == index ? 'active' : ''} onClick={this.change.bind(this, index)}>{item}</span>
                        ))
                    }

                </div>
                <div className="list-item">
                    {
                        BookList.map((item, index) => (
                            <div className="book-item" key={index} style={{ display: curr == 0 ? "flex" : 'none' }} onClick={this.gotoD.bind(this, item)}>
                                <div className="book-cover">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="book-info">
                                    <h3>{item.Bookname}</h3>
                                    <blockquote>{item.introduce}</blockquote>
                                    <div className="Author-box">
                                        <span className="one">{item.Author}</span>
                                        <span className="two">{item.tags}</span>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        HotList.map((item, index) => (
                            <div className="book-item" key={index} style={{ display: curr == 1 ? "flex" : 'none' }} onClick={this.gotoD.bind(this, item)}>
                                <div className="book-cover">
                                    <img src={item.image} alt="" />
                                </div>
                                <div className="book-info">
                                    <h3>{item.Bookname}</h3>
                                    <blockquote>{item.introduce}</blockquote>
                                    <div className="Author-box">
                                        <span className="one">{item.Author}</span>
                                        <span className="two">{item.tags}</span>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
        )
    }
}
