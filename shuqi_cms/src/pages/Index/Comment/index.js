import React, { useState, useEffect } from "react"
import store from "../../../store"
import { Input, Select, Divider, Pagination, Table, Tag, Space, Button, Upload, message, Checkbox, Modal, Radio, Form, Alert } from "antd"
import { search, comment, removeComment } from "./../../../api"
function Comment() {

    const [listtotal, setlisttotal] = useState(1)
    const [category, setcategory] = useState("mid")
    const [page, setpage] = useState(1)
    const [size, setsize] = useState(10)
    const [list, setlist] = useState([])
    const { Column } = Table;
    const [userlist, setuserlist] = useState("")
    const [searchorinit, setsearchorinit] = useState(0)
    const [searchval, setsearchval] = useState("")
    useEffect(() => {
        getdata()
        console.log(list)
    }, [page, size]);
    function cc(val) {//修改搜索分类
        setcategory(val)
    }
    async function getdata() {
        let condition = {
            type: "comment",
            page: page,
            size: size,
        }
        await comment(condition).then(res => {
            console.log(res);
            if (res.data.length == 0) {
                setlisttotal(0)
            }
            let list = res.data.map(item => {
                item.key = item.mid
                item.time = new Date(item.pubTime * 1000).toLocaleDateString()
                return item
            })
            setlist(list)
            let total = res.total
            setlisttotal(total)
        })
    }
    async function commentsearch(val) {
        setsearchval(val)
        console.log(val)
        let condition = {
            Dbtable: "abbb",
            category: category,
            page: page,
            size: size,
            info: val,
            token: store.getState().token
        }
        await search(condition).then(res => {
            console.log(res)
            if (res.code === 2000) {
                let list = res.data.map(item => {
                    item.key = item.mid
                    return item
                })
                setlist(list)
                setsearchorinit(1)
                let count = res.count
                console.log("count:" + count)
                setlisttotal(count)
            } else {
                message.error('查询失败');
                setsearchorinit(0)
                getdata()

            }

        })
    }
    function remove(data) {
        console.log(data)
        var mid = data.mid
        var token = store.getState().token
        let condition = {
            mid: mid,
            token: token
        }
        removeComment(condition).then(res => {
            if (res.code == 2000) {
                message.success('删除成功!');
                getdata()
            }
        })
    }

    function Turnpages(page, size) {
        setsize(size)
        setpage(page)
        if (searchorinit) {
            commentsearch(searchval)
        } else {
            getdata()
        }
    }
    const { Search } = Input;
    const { Option } = Select;
    return <>

        <Input.Group>
            <Select defaultValue="mid" onChange={cc} style={{ width: 100 }}>
                <Option value="mid">评论ID</Option>
                <Option value="nickName">用户名</Option>
            </Select>
            <Search
                placeholder="input search text"
                onSearch={value => commentsearch(value)}
                style={{ width: 200 }}
            /></Input.Group>
        <Divider />
        <div>
            <Table dataSource={list} pagination={false} >
                <Column title="Comment_id" dataIndex="mid" />
                <Column title="nickName" dataIndex="nickName" />
                <Column title="pubTime" dataIndex="time" />
                <Column title="zanNum" dataIndex="zanNum" />
                <Column title="replyNum" dataIndex="replyNum" ellipsis={true} style={{ width: 200, border: "1px solid" }} />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Button type="danger" ghost onClick={() => { remove(record) }}>Delete</Button>
                    )}
                />
            </Table>

            <Pagination
                total={listtotal}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultsize={10}
                defaultCurrent={1}
                onChange={(page, pagesize) => { Turnpages(page, pagesize) }}
            />
        </div>
    </>
}

export default Comment