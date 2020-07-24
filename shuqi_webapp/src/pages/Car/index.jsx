import React, { Component } from 'react'
import PageLayout from '../../layout/PageLoyout'
import { SearchBar, Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';

import { connect } from 'react-redux'




import CartlistAPi from "../../api/Cartlist"
import { Checkbox } from 'antd';

import axios from "axios"
import './Cardetail.scss'
const alert = Modal.alert;
class Car extends Component {

    constructor() {
        super()
        this.state = {
            // novelData: [],
            uid: '',
            Cartlist: [],
            flag: true,
            checkedAll: false,//全选状态
            checkedInvert: false,//反选状态
            checkedId: [],
            i: 0,
            ids: '',
            isgo:true
        }
    }
    componentDidMount(){
        this.daList()
       window.addEventListener('mouseup', e=>e.preventDefault(), { passive: false })
       window.addEventListener('mousedown', e=>e.preventDefault(), { passive: false })
       
    }


        componentWillUnmount() { 
                clearTimeout(this.timeOutEvent)

            }

    //页面渲染
    async daList () {
        let p = await CartlistAPi.Getcarlist(1, 10)
        // console.log("一开始3", p.data);
        this.setState({
            Cartlist: p.data,
            i:0,
            flag:true
        })
    }





    gotohome = () => {
        this.props.history.push('/home')
    }
    search = () => {
        this.props.history.push('/searchs')
    }




    anle1 = (e) => {

        const { flag } = this.state
   
        
        if (flag == true) {
            this.timeOutEvent = setTimeout(() => {

                // console.log("你长按了");
                this.timeOutEvent = 0;
                this.setState({
                    flag: false
                })
            }, 1200);
        }
       
    }

    anle2=(e)=>{
       e.stopPropagation()
       window.addEventListener("touchend",e=>e.preventDefault(),{passive:false}) 
       
    }
        
    

    clikle = (e) => {
        // let data = new Date()
        // console.log(1);
        // e.preventDefault()
    }
    

    //点击复选框的时候
    onChange = (item,event) => {
        // console.log(item);
        let { Cartlist, checkedAll } = this.state
        const { bid } = item
        event.stopPropagation( )
        // react-redux 写法
        const { dispatch, bookList } = this.props
        
        let i = 0
        let l = 0;
        Cartlist.map((option, index) => {
            if (option.Id == item.Id) {
                option.check = !item.check
            } if (option.check == true) {
                // i+=1
                i += 1
            } if (option.check == false) {
                l += 1
            }
        })
        if (Cartlist.length == i) {
         
            checkedAll = true;
        } if (Cartlist.length > i) {
        
            checkedAll = false;
        }



     
         //react-redux //BookList this.props
        const currentbook = bookList.filter(item => item.bid === bid)[0]
        if (currentbook) {

        } else {
            dispatch({
                type: 'add_to_book',
                books: {
                    bid,
                    checked: false
                }
            })
        }
       


        this.setState({
            Cartlist: Cartlist,
            checkedAll: checkedAll,
            i: i,
          
        })




    }


    //点击取消关闭
    close = () => {
        this.setState({
            flag: true
        })
    }
    changeAll = (q,e) => {
       
        let { Cartlist, checkedAll, checkedId } = this.state
        Cartlist.map(item => (item.check = !checkedAll))
        this.setState({
            checkedAll: !checkedAll,
            checkedInvert: false,
            Cartlist: Cartlist,
            i: q
        })
    }
    gotoread = (e)=>{
        const {isgo} = this.state
        const {history} = this.props
        if(isgo){

            history.push('/zhangjie')
        }
        
        this.setState({
            isgo:false
        })
    }
    

    
    render() {
        // console.log(this.props);
        let { Cartlist, flag, checkedAll, check, i, ids ,isgo} = this.state
        // console.log("Cartlist",Cartlist);
        // console.log("ids",ids);

        let arr2 = Cartlist.filter(item=>item.check)
        let arr3 = arr2.map(item=>item.bid)
        let str = arr3.join(',')
        // console.log(str);

        //获取id值 22,23,24
        // let { bookList } = this.props
        // bookList.forEach(item => {
        //     ids += item.bid + ','
        // })
        // console.log(ids.slice(0, -1));


        return (
            <PageLayout>
                <div className="Carbox"  >
                    <div onClick={this.search} className="search-bar">
                        <SearchBar placeholder="请输入书名或作者名" disabled />
                    </div>
                    {
                        Cartlist.length > 0 ?

                            <div className="self-area">
                                {Cartlist.map(item => (
                                    <div className="self-item" key={item.bookName} onTouchStart={this.anle1} onMouseUp={this.clikle}>
                                        <div className="img-content">
                                           {isgo&&flag==false?<img src={item.bookCover} alt=""  />:<img src={item.bookCover} alt="" onClick={this.gotoread} />}
                                            {flag ? "" : <Checkbox onChange={this.onChange.bind(this, item)} checked={item.check} ></Checkbox>}
                                        </div>
                                        <p>{item.bookName}</p>
                                    </div>
                                ))}
                                <div className="huibox" onClick={this.gotohome}>
                                    <span>+</span>
                                </div>
                            </div> : <div className="content-box">
                                <div>
                                    <img src="data:image/png;base64,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" alt="" />
                                    <p>把生命浪费在美好的事物上</p>
                                    <button onClick={this.gotohome}>去书城</button>
                                </div>
                            </div>
                    }
                    {flag ? '' : <div className="tab-bar">
                        <ul>
                            <li onClick={this.close}>取消</li>
                            {checkedAll ? <li onClick={this.changeAll.bind(this, 0)}>取消全选</li> : <li onClick={this.changeAll.bind(this, Cartlist.length)}>全选</li>}
                            
                            
                            
                            <li style={{ color: i > 0 ? "#23b383" : "#ccc" }} onClick={() =>
                                i === 0 ? '' :
                                    alert('', `是否删除所选${i}本书籍???`, [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        {
                                            text: '删除', onPress: (e) => {
                                                
                                                //发送删除多个书本的请求
                                                // CartlistAPi.delBook(ids.slice(0, -1)).then(res => {
                                                CartlistAPi.delBook(str).then(res => {
                                                    // console.log(res);
                                                    if (res.flag === true) {
                                                        // this.setState({
                                                        //     Cartlist: Cartlist,
                                                        //     i:0
                                                        // })
                                                        // window.location.reload()
                                                        this.daList();
                                                    }
                                                    
                                                })
                                                // this.forceUpdate();
                                            }
                                        },
                                    ])
                            }>
                                {
                                    i > 0 ? `删除(${i})` : '删除'
                                }</li>
                        </ul>
                    </div>}
                </div>
            </PageLayout >
        )
    }
}


const mapStateToProps = (state) => {
    // console.log('state', state);
    return {
        bookList: state.bookList
    }
}



Car = connect(mapStateToProps)(Car)
export default Car