import React from "react"
import { Form, Input, Button } from "antd"
import "./Login.css"
import { login } from "./../../api"
class Login extends React.Component {
    formRef = React.createRef();
    constructor() {
        super()
        this.state = {
            layout: {
                labelCol: { span: 6 },
                wrapperCol: { span: 12 },
            },
            tailLayout: {
                wrapperCol: { offset: 10, span: 12 },
            },
            username: "",
            password: ""
        }
    }
    // layout = {
    //     labelCol: { span: 6 },
    //     wrapperCol: { span: 12 },
    // };
    // tailLayout = {
    //     wrapperCol: { offset: 10, span: 12 },
    // };
    login = () => {
        let { username, password } = this.state
        if (username && password) {
            console.log(1)
            login(username, password).then(res => {
                if (res.code == 200) {
                    console.log(res)
                    localStorage.setItem("shuqi_cms", res.data.token)
                    localStorage.setItem("shuqi_cms_user", username)
                    this.props.history.push("/")
                }
            })
        }

    }
    change = (type, e) => {
        if (type == "pwd") {
            this.setState({
                password: e.target.value
            })
        } else {
            this.setState({
                username: e.target.value
            })
        }

    }
    render() {
        var { tailLayout, layout } = this.state
        return (
            <div className="login">

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    ref={this.formRef}
                ><header><h1>小说管理系统</h1></header>
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}

                    >
                        <Input ref="username" onChange={(e) => { this.change("user", e) }} />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input ref="password" onChange={(e) => { this.change("pwd", e) }} />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="ghost" htmlType="submit" onClick={() => { this.login() }}>
                            登录
              </Button>
                    </Form.Item>
                </Form>
            </div >

        )
    }
}

export default Login
