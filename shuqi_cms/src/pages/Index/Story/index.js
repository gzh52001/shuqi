import React, { setState, useState, useEffect } from "react"
import { Input, Select, Divider, Pagination, Table, Tag, Space, Button, Upload, message, Checkbox, Modal, Radio, Form, Alert } from "antd"
import { search, init, removebook } from "./../../../api"
import store from "./../../../store"
// import { CollectionCreateForm } from "./../../CollectionCreateForm"
function Story(props) {
    const [listtotal, setlisttotal] = useState(1)
    const [category, setcategory] = useState("author")
    const [page, setpage] = useState(1)
    const [size, setsize] = useState(10)
    const [list, setlist] = useState([])
    const { Search } = Input
    const { Option } = Select;
    const { Column } = Table;
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
            type: "story",
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
    function storysearch(val) {
        let condition = {
            type: "story",
            category: category,
            info: val,
            token: props.token
        }
        let data = search(condition)
        setlist(data)

    }
    useEffect(() => {

    }, [category])
    function cc(val) {//修改搜索分类
        setcategory(val)
    }

    function remove(data) {
        console.log(data)
        var Book_id = data.Book_id
        var token = store.getState().token
        removebook(Book_id, token).then(res => {
            if (res.code == 2000) {
                message.info('删除成功!');
                getdata()
            }
        })
    }

    const [visible, setVisible] = useState(false);

    const onCreate = values => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (<> <Input.Group>
        <Select defaultValue="author" onChange={cc} style={{ width: 100 }}>
            <Option value="author">作者</Option>
            <Option value="bookid">书本ID</Option>
            <Option value="category">分类</Option>
        </Select>
        <Search
            placeholder="input search text"
            onSearch={value => storysearch(value)}

            style={{ width: 200 }}
        /> <Button type="primary" style={{ float: "right" }} onClick={() => {
            setVisible(true);
        }}>添加新书</Button></Input.Group>

        <Divider />
        <div>
            <Table dataSource={list} pagination={false} >
                <Column title="Book_id" dataIndex="Book_id" />
                <Column title="Bookname" dataIndex="Bookname" />
                <Column title="Type" dataIndex="Type" />

                <Column title="Author" dataIndex="Author" />
                <Column title="Tags" dataIndex="tags" />

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
            />
        </div>
        <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
                setVisible(false);
            }}
            rowinfo={rowinfo}

        />


    </>)
}

const CollectionCreateForm = ({ visible, onCreate, onCancel, rowinfo }) => {
    const { Option } = Select
    const upload = {
        name: 'file',

        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const plainOptions = ['热血', '校园', '轻松', "爽文", "异能", "重生", "公主", "异术超能", "HE", "暧昧", "YY", "美人", "都市生活", "穿越", "励志", "修炼", "玄术"];
    const [form] = Form.useForm();
    return (
        <Modal
            destroyOnClose="true"

            visible={visible}
            title="小说信息"
            okText="提交"
            cancelText="取消"
            onCancel={() => {
                form.resetFields()
                console.log(1)
                onCancel()
            }}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
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
                initialValues={{
                    "bookname": rowinfo.Bookname,
                    "author": rowinfo.Author,
                    "category": rowinfo.category,
                    "summary": rowinfo.summary,

                }}
            >
                <Form.Item
                    name="bookname"
                    label="书名"
                    rules={[
                        {
                            required: true,
                            message: '请输入书名',
                        },

                    ]}

                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="author"
                    label="作者"
                    rules={[
                        {
                            required: true,
                            message: '请输入作者姓名',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="类别"
                    rules={[{
                        required: true,
                        message: "请选择小说分类"
                    }]}
                    initialValue={rowinfo.Type}>
                    <Select >
                        <Option value="city">都市</Option>
                        <Option value="xuanhuan">玄幻</Option>
                        <Option value="xianxia">仙侠</Option>
                        <Option value="lingyi">灵异</Option>
                        <Option value="lishi">历史</Option>
                        <Option value="youxi">游戏</Option>
                        <Option value="kehuan">科幻</Option>
                        <Option value="wuxia">武侠</Option>
                        <Option value="qihuan">奇幻</Option>
                        <Option value="jingji">竞技</Option>
                        <Option value="qita">其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="tags"
                    label="标签"
                    rules={[{
                        required: true,
                        message: "请选择小说标签"
                    }]

                    }
                    initialValue={rowinfo.tags}
                >
                    <Checkbox.Group options={plainOptions} />
                </Form.Item>

                <Form.Item
                    name="summary"
                    label="概述"
                    initialValue={rowinfo.introduce}
                    rules={[
                        {
                            required: true,
                            message: '请输入概述',
                        },
                    ]}>
                    <Input.TextArea type="textarea" autoSize={true} />
                </Form.Item>

            </Form>
        </Modal>
    );
};



export default Story