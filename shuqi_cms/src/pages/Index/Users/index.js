import React from "react"
import store from "../../../store"
import { Input, Select, Divider } from "antd"

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = { n: store.getState().logined }
        console.log(this.props)
    }
    render() {
        const { Search } = Input
        const { Option } = Select;
        return <><Input.Group>
            <Select defaultValue="username" style={{ width: 100 }}>
                <Option value="username">用户名</Option>
                <Option value="userid">用户ID</Option>
            </Select>
            <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            /></Input.Group>
            <Divider /> </>
    }
}
export default Users