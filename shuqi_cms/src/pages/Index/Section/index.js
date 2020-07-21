import React, { useState, useEffect, Fragment } from "react"
import { Input, Select, Divider, Pagination, Table, Space, Button, message, Modal, Form } from "antd"
import { search, init, removeSection, insertSection, updateSection } from "./../../../api"
import store from "./../../../store"

function Section(props) {
    const [listtotal, setlisttotal] = useState(1)
    const [category, setcategory] = useState("author")
    const [page, setpage] = useState(1)
    const [size, setsize] = useState(10)
    const [list, setlist] = useState([])
    const { Search } = Input
    const { Option } = Select;
    const { Column } = Table;
    const [mark, setmark] = useState(false)

    // var rowinfo = ""
    const [rowinfo, setrowinfo] = useState("")

    useEffect(() => {

        getdata()
        console.log(list)
    }, [page, size]);
    function storysearch(val) {
        console.log(val)
    }
    function Turnpages(page, size) {
        setsize(size)
        setpage(page)
    }
    async function getdata() {
        let condition = {
            type: "section",
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
    async function storysearch(val) {
        console.log(val)
        let condition = {
            Type: "storylist",
            category: category,
            info: val,
            token: store.getState().token
        }
        await search(condition).then(res => {
            console.log(res)
            if (res.code === 2000) {
                let list = res.data.p.map(item => {
                    item.key = item.Book_id
                    return item
                })
                setlist(list)
            } else {
                message.error('查询失败');
                getdata()
            }

        })
    }
    useEffect(() => {
    }, [category])
    function cc(val) {//修改搜索分类
        setcategory(val)
    }

    function remove(data) {
        console.log(data)
        var Section_id = data.Section_id
        var token = store.getState().token
        removeSection(Section_id, token).then(res => {
            if (res.code == 2000) {
                message.success('删除成功!');
                getdata()
            } else {
                message.error("删除失败")
            }
        })
    }

    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
        setmark(false)
    };

    return (<Fragment> <Input.Group>
        <Select defaultValue="Author" onChange={cc} style={{ width: 100 }}>
            <Option value="Author">作者</Option>
            <Option value="Book_id">书本ID</Option>
            <Option value="sectionId">章节Id</Option>
        </Select>
        <Search
            placeholder="input search text"
            onSearch={value => storysearch(value)}
            style={{ width: 200 }}
        /> <Button type="primary" style={{ float: "right" }} onClick={() => {
            setVisible(true); setmark(true)
        }}>更新章节</Button></Input.Group>

        <Divider />
        <div>
            <Table dataSource={list} pagination={false} >
                <Column title="SectionId" dataIndex="Section_id" />
                <Column title="SectionName" dataIndex="Sectionname" />
                <Column title="StoryName" dataIndex="Story" />
                <Column title="Content" dataIndex="Content" />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="small">
                            <Button type="primary" ghost onClick={() => { setrowinfo(record); setVisible(true); }}>Update</Button>
                            <Button type="danger" ghost onClick={() => { remove(record) }}>Delete</Button>
                        </Space>
                    )}
                />
            </Table>

            <Pagination
                total={listtotal}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultsize={10}
                defaultCurrent={1}
                onChange={(page, pagesize) => { Turnpages(page, pagesize) }}
            // pageSizeOptions={[5, 10, 20]}
            />
        </div>
        <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
                setVisible(false);
            }}
            rowinfo={rowinfo}
            mark={mark}
        />
    </Fragment>)
}

const CollectionCreateForm = ({ visible, onCreate, onCancel, rowinfo, mark }) => {
    const { Option } = Select
    const { Search } = Input
    const [insertype, setinserttype] = useState("Author")
    const [form] = Form.useForm();
    const [classify, setclassify] = useState("Author")
    const [searchbook, setsearchbook] = useState([])
    useEffect(() => {
        if (!mark) {

            form.setFieldsValue({
                "SectionId": rowinfo.Book_id,
                "Bookname": rowinfo.Bookname,
                "Author": rowinfo.Author,
                "Type": rowinfo.Type,
                "introduce": rowinfo.introduce,
                "tags": rowinfo.tags
            })
        } else {
            form.resetFields()
        }
    })
    async function insertsearch(val) {  //添加新章节的查询
        console.log(1)
        let condition = {
            Type: "storylist",
            category: classify,
            info: val,
            token: store.getState().token
        }
        await search(condition).then(res => {
            console.log(res)
            if (res.code === 2000) {
                let list = res.data.map(item => {
                    item.key = item.Book_id
                    return item
                })
                setsearchbook(list)
            }
            else {
                message.error("查询失败")
            }

        })
    }
    function cc(val) {  //修改查询类型
        setclassify(val)
    }
    function cbname(val) {
        console.log(val)
        setinserttype(val)
    }

    return (
        <Modal
            getContainer={false}
            destroyOnClose={true}
            visible={visible}
            title="章节信息"
            okText="提交"
            cancelText="取消"
            onCancel={() => {
                form.setFieldsValue({})
                form.resetFields()

                onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        console.log("com", values)
                        values.tags.join(",")
                        let condition = {
                            ...values,
                            token: store.getState().token,
                        }
                        console.log(mark)
                        if (mark) {
                            insertSection(condition).then(res => {
                                console.log(res)
                                if (res.code === 200) {
                                    message.success("插入成功")
                                } else {
                                    message.error("插入失败")
                                }
                            })
                        } else {
                            updateSection(condition).then(res => {
                                console.log(res)
                                if (res.code === 404) {
                                    message.error("修改失败")
                                }
                                if (res.code == 2000) {
                                    message.success("修改成功")
                                }
                            })
                        }
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >

                <Form.Item
                    name="Bookname"
                    hidden={!mark}
                    label="书名"
                    rules={[
                        {
                            required: true,
                            message: '请输入书名',
                        },

                    ]}
                >
                    <Select defaultValue="Author" onChange={cc} style={{ width: "20%" }}>
                        <Option value="Author">作者</Option>
                        <Option value="Book_id">书本ID</Option>
                        <Option value="Type">分类</Option>
                    </Select>
                    <Search

                        placeholder="input search text"
                        onSearch={insertsearch}

                        style={{ width: "80%" }}
                    />
                </Form.Item>


                <Form.Item
                    hidden={!mark}
                    name="checkstory"
                    label="小说"
                    rules={[{
                        required: true,
                        message: "请选择小说"
                    }]}
                >
                    <Select placeholder="请选择" onChange={cbname}>
                        {
                            searchbook.map(item => {
                                return <Option value={item.bookname} key={item.Bookname}>{item.bookname}</Option>
                            })}

                    </Select>
                </Form.Item>
                <Form.Item
                    hidden={mark}
                    name="story"
                    label="小说"
                    rules={[{
                        required: true,
                        message: "请选择小说"
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="Sectionname"
                    label="章节名"
                    rules={[
                        {
                            required: true,
                            message: '请输入章节名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="内容"
                    rules={[
                        {
                            required: true,
                            message: '请输入章节内容',
                        },
                    ]}>
                    <Input.TextArea type="textarea" autoSize={true} />
                </Form.Item>
            </Form>
        </Modal>
    );
};




export default Section