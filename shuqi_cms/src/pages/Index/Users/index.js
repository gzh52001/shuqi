import React, { useState, useEffect } from "react"
import store from "../../../store"
import { Input, Select, Divider, Pagination, Table, Button, message } from "antd"
import { search, init, removeUser } from "./../../../api"
function Users() {
    const { Search } = Input;
    const { Option } = Select;
    const [listtotal, setlisttotal] = useState(1)
    const [category, setcategory] = useState("Username")
    const [page, setpage] = useState(1)
    const [size, setsize] = useState(10)
    const [list, setlist] = useState([])

    const { Column } = Table;
    useEffect(() => {

        getdata()
    }, [page, size]);
    function cc(val) {//修改搜索分类
        setcategory(val)
    }
    async function getdata() {
        let condition = {
            type: "user",
            page: page,
            size: size,
        }
        await init(condition).then(res => {
            if (res.data.length === 0) {
                setlisttotal(0)
            }
            console.log(res.data);
            let list = res.data.map(item => {
                item.key = item.Id
                return item
            })
            setlist(list)
            let total = res.total
            setlisttotal(total)
        })
    }
    async function usersearch(val) {
        console.log(val)
        let condition = {
            Dbtable: "userlist",
            category: category,
            info: val,
            token: store.getState().token
        }
        await search(condition).then(res => {
            console.log(res)
            if (res.code === 2000) {
                let list = res.data.map(item => {
                    item.key = item.Id
                    return item
                })
                setlist(list)
            } else {
                message.error('查询失败');
                getdata()
            }

        })
    }
    function remove(data) {
        console.log(data)
        var Id = data.Id
        var token = store.getState().token
        removeUser(Id, token).then(res => {
            if (res.code === 2000) {
                message.info('删除成功!');
                getdata()
            }
        })
    }

    function Turnpages(page, size) {
        setsize(size)
        setpage(page)
    }
    return <>
        <Input.Group>
            <Select defaultValue="Username" onChange={cc} style={{ width: 100 }}>
                <Option value="Username">用户名</Option>
                <Option value="Id">用户ID</Option>
            </Select>
            <Search
                placeholder="input search text"
                onSearch={value => usersearch(value)}
                style={{ width: 200 }}
            /></Input.Group>
        <Divider />
        <div>
            <Table dataSource={list} pagination={false} >
                <Column title="Id" dataIndex="Id" />
                <Column title="Username" dataIndex="Username" />
                <Column title="Password" dataIndex="Password" />
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

export default Users