//搜索页面
import React, { Component } from 'react';
import axios from 'axios/dist/axios';
import { SearchBar } from 'antd-mobile';

import './Searchs.css'

class Searchs extends Component {
    state = {
        dataList: null // 热门搜索数据
    }
    //取消按钮
    cancel = () => {
        this.props.history.goBack()
    }
    //清空按钮
    empty = () => {
        // console.log('清空');
    }
    async componentDidMount() {
        //热门搜索数据请求
        let p = await axios.get("http://read.xiaoshuo1-sm.com/novel/i.php?do=is_payreco&isNewBind=0&tk=&imei=7782ce6460e831feed9d2e0ce0be30d1_shuqi_touch&sn=7782ce6460e831feed9d2e0ce0be30d1_shuqi_touch&channelId=&clientPatch=&clientVersion=&device=&deviceId=&model=&osName=&osVersion=&umidToken=&appVersion=&app=&platform=3&ykToken=&ykuid=&shuqi_h5=&user_id=8000000&id=8000000&qtf=shuqiApp&qtn=cpSearchSug_ios&nums=10&p=3&timestamp=1594990085&sign=601826f8a7a9e17a27883a8d387c4b21")
            .then(function (response) {
                let obj = response.data.data.map(item => {
                    let tgs = item.tags.split(',')
                    // console.log(tgs);
                    item = {
                        actionType: "book",
                        author: item.author,
                        bid: item.bookid,
                        bookCover: item.cover,
                        bookName: item.title,
                        cache: true,
                        chargeMode: "3",
                        desc: item.desc,
                        price: "0.6",
                        readFeatureOpt: "0",
                        tags: tgs,
                        wordCount: item.words
                    }
                return item
                });
                // console.log('obj',obj);
                return obj
            }).catch(function (error) {
                console.log(error);
            })
        // console.log(p);

        this.setState({
            dataList: p
        })
    }
    // 点击进入详情页
    particulars = (item) => {
        this.props.history.push({
            pathname: '/particulars',
            state: item
        })//跳转详情页面
        console.log('搜索', item);
    }
    render() {
        const { dataList } = this.state
        // console.log(this.state.dataList);
        return (
            <>
                {
                    !dataList ? null
                        : <div className="searchs">
                            <SearchBar
                                placeholder="请输入书名或作者名"
                                onCancel={this.cancel}
                                disabled={false}
                                showCancelButton
                            />
                            <div className="hot-search">
                                <h6 className="earch-history_title">热门搜索</h6>
                                <ul className="rp-label-rank">
                                    {
                                        dataList.map(item => (
                                            <li key={item.bid} onClick={this.particulars.bind(this, item)}>{item.bookName}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="hot-search">
                                <h6 className="earch-history_title">搜索历史
                                    <span onClick={this.empty}>清空</span>
                                </h6>
                                <ul className="rp-label-rank">
                                    {/* <li>六界封神</li> */}
                                </ul>
                            </div>
                        </div>
                }
            </>

        );
    }
}

export default Searchs;