import React, { lazy, Suspense } from "react"
import { withLogin } from "../../utils/Hoc"
import "./Index.css"
import { Route, Redirect, Switch } from "react-router-dom"
import { Layout, Menu, Spin } from 'antd';
import { ProjectOutlined, BookOutlined, UsergroupAddOutlined, LogoutOutlined, MessageOutlined } from '@ant-design/icons';
import store from "./../../store"

// import Story from "./Story"
// import Users from "./Users"
// import Section from "./Section"
// import Comment from "./Comment"
// import Nofind from "./../Nofind"
const Story = lazy(() => import("./Story"))
const Users = lazy(() => import("./Users"))
const Section = lazy(() => import("./Section"))
const Comment = lazy(() => import("./Comment"))
const Nofind = lazy(() => import("./../Nofind"))
class Index extends React.Component {
    constructor() {
        super()
        this.state = {
            now_path: ""
        }
    }
    handleClick = e => {
        console.log('click ', e.key);
        this.props.history.push(e.key)
    };
    async componentWillMount() {
        if (this.props.location.pathname == "/") {
            this.setState({
                now_path: "/index/story"
            })
        } else {
            this.setState({
                now_path: this.props.location.pathname
            })
        }

    }
    logout = () => {
        localStorage.removeItem("shuqi_cms")
        this.props.history.push("/login")
    }
    render() {
        const { Header, Content, Sider } = Layout;
        var { now_path } = this.state
        // console.log(now_path)
        return (
            <>
                <Layout>
                    <Header className="header">
                        <div>
                            <h1 style={{ width: "300px", display: "inline" }}> 小说管理系统</h1>
                            <div style={{ width: "150px", display: "inline", float: "right", color: "#fff", fontSize: 14 }}>
                                <span>欢迎：{store.getState().user}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span onClick={this.logout}><LogoutOutlined />退出</span>
                            </div>
                        </div>


                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background" theme='light'>
                            <Menu
                                onClick={this.handleClick}
                                style={{ width: 200 }}
                                defaultSelectedKeys={now_path}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                <Menu.Item key="/index/story" icon={<BookOutlined />}>
                                    小说管理
                                </Menu.Item>
                                <Menu.Item key="/index/users" icon={<UsergroupAddOutlined />}>
                                    用户管理
                                </Menu.Item>
                                <Menu.Item key="/index/section" icon={<ProjectOutlined />}>
                                    章节更新
                                </Menu.Item>
                                <Menu.Item key="/index/comment" icon={<MessageOutlined />}>
                                    评论管理
                                </Menu.Item>

                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px', boxSizing: "border-box", height: '100%' }} mode="inline">

                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                    boxSizing: "border-box",
                                    overflowY: "auto"
                                }}
                            >
                                <Suspense fallback={<div style={{
                                    textAlign: "center",
                                    background: "rgba(0, 0, 0, 0.05)",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: '100%'
                                }}>
                                    <Spin />
                                </div>}>
                                    <Switch>
                                        <Route path="/index/users" component={Users}></Route>
                                        <Route path="/index/story" component={Story}></Route>
                                        <Route path="/index/section" component={Section}></Route>
                                        <Route path="/index/comment" component={Comment}></Route>
                                        <Redirect from="/" to="index/story" exact></Redirect>
                                        <Route component={Nofind} />
                                    </Switch>
                                </Suspense>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        )
    }
}
Index = withLogin(Index)
export default Index