import React, { useState, useEffect } from "react"
import store from "../../../store"
import { Input, Select, Divider, Table, } from "antd"
import { search, init, removebook } from "./../../../api"
function Users() {
    const { Search } = Input;
    const { Option } = Select;
    const [listtotal, setlisttotal] = useState(1)
    const [category, setcategory] = useState("author")
    const [page, setpage] = useState(1)
    const [size, setsize] = useState(10)
    const [list, setlist] = useState([])

    const { Column } = Table;
    const [userlist, setuserlist] = useState("")
    useEffect(() => {

        getdata()
        console.log(list)
    }, [page, size]);

    async function getdata() {
        let condition = {
            type: "user",
            page: page,
            size: size,
        }
        await init(condition).then(res => {
            console.log(res.data);
            let list = res.data.map(item => {
                item.key = item.Book_id
                return item
            })
            setlist(list)
            let total = res.total
            setlisttotal(total)
        })
    }
    return <>
        <Input.Group>
            <Select defaultValue="username" style={{ width: 100 }}>
                <Option value="username">用户名</Option>
                <Option value="userid">用户ID</Option>
            </Select>
            <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            /></Input.Group>
        <Divider />

    </>
}
// class Users extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = { n: store.getState().logined }
//         console.log(this.props)
//     }
//     render() {
//         const { Search } = Input
//         const { Option } = Select;
//         return <><Input.Group>
//             <Select defaultValue="username" style={{ width: 100 }}>
//                 <Option value="username">用户名</Option>
//                 <Option value="userid">用户ID</Option>
//             </Select>
//             <Search
//                 placeholder="input search text"
//                 onSearch={value => console.log(value)}
//                 style={{ width: 200 }}
//             /></Input.Group>
//             <Divider />

//         </>

//     }
// }
export default Users