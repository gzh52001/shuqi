import React from "react"
import { Input, Select, Divider, Pagination, Table, Tag, Space, Button } from "antd"
import { search, init, } from "./../../../api"
class Story extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: "",
            search_info: "",
            category: "author",
            page: 1,
            pagesize: 10
        }
        this.storysearch = this.storysearch.bind(this)
        this.Turnpages = this.Turnpages.bind(this)
        this.getdata = this.getdata.bind(this)
    }
    componentWillMount() {//初始化加载数据
        this.getdata()
    }
    async getdata() {
        try {
            let condition = {
                type: "story",
                page: this.state.page,
                pagesize: this.state.pagesize
            }
            console.log(condition)
            let data = await init(condition);
            this.setState({
                list: data
            })
        } catch (error) {
            console.log(error)
        }

    }
    async storysearch(val) {//小说页面搜索
        // console.log(val, this.state.category)
        let condition = {
            type: "story",
            category: this.state.category,
            info: val
        }
        let data = await search(condition)
        this.setState({
            list: data
        })
    }
    Turnpages(page, pagesize) {//翻页
        try {
            console.log(page, pagesize)
            this.setState({
                page: page,
                pagesize: pagesize
            })
            console.log(this.state)
            this.getdata()
        } catch (error) {
            console.log(error)
        }

    }
    changecategory = (val) => {
        this.setState({
            category: val
        })

    }
    render() {
        const { Search } = Input
        const { Option } = Select;
        const { Column } = Table;
        const { list } = this.state//获取渲染数据
        const data = [
            {
                key: '1',
                firstName: 'John',
                BookName: 'Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                firstName: 'Jim',
                BookName: 'Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                firstName: 'Joe',
                BookName: 'Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ];
        return <> <Input.Group>
            <Select defaultValue="author" onChange={this.changecategory} style={{ width: 100 }}>
                <Option value="author">作者</Option>
                <Option value="bookid">书本ID</Option>
                <Option value="category">分类</Option>
            </Select>
            <Search
                placeholder="input search text"
                onSearch={value => this.storysearch(value)}

                style={{ width: 200 }}
            /></Input.Group>
            <Divider />
            <div>
                <Table dataSource={data} pagination={false} >
                    <Column title="BookId" dataIndex="key" key="BookId" />
                    <Column title="BookName" dataIndex="BookName" key="BookName" />
                    <Column title="Age" dataIndex="age" key="age" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <>
                                {tags.map(tag => (
                                    <Tag color="blue" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="small">
                                <Button type="primary" ghost>Update</Button>
                                <Button type="danger" ghost>Delete</Button>
                            </Space>
                        )}
                    />
                </Table>
                <Pagination
                    // total={data.length}
                    total={90}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={10}
                    defaultCurrent={1}
                    onChange={(page, pagesize) => { this.Turnpages(page, pagesize) }}
                />
            </div>
        </>
    }
}
export default Story