import React, { Fragment } from "react"
import { Input, Select, Divider, Pagination, Table, Tag, Space, Button, Upload, message, Checkbox, Modal, Form, Alert } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { search, init, removebook, updateStory } from "./../../../api"
import store from "./../../../store"
import { CollectionCreateForm } from "./../../CollectionCreateForm"
class Story extends React.Component {
    constructor() {
        super()
        this.state = {
            listtotal: 1,
            category: "Author",
            page: 1,
            size: 10,
            list: [],
            rowinfo: "",
            visible: false,
            mark: false,
            defaultsize: 0
        }
    }
    componentDidMount() {
        this.getdata()
    }
    async getdata() {
        let condition = {
            type: "story",
            page: this.state.page,
            size: this.state.size,
        }
        await init(condition).then(res => {
            if (res.data.length == 0) {
                this.setState({
                    listtotal: 0
                })
            }
            console.log(res.data);
            let list = res.data.map(item => {
                item.key = item.Book_id
                item.tag = item.tags.split(",")
                console.log(item.tags)
                return item
            })
            let total = res.total
            this.setState({
                listtotal: total,
                list: list,

            })
        })
    }
    async storysearch(val) {
        console.log(val)
        let condition = {
            Dbtable: "storylist",
            category: this.state.category,
            info: val,
            token: store.getState().token
        }
        await search(condition).then(res => {
            console.log(res)
            if (res.code === 2000) {
                let list = res.data.map(item => {
                    item.key = item.Book_id
                    item.tag = item.tags.split(",")
                    return item
                })
                let total = list.length
                this.setState({
                    list: list,
                    listtotal: total
                })
            } else {
                message.error('查询失败');
                this.getdata()
            }

        })
    }
    remove(data) {
        console.log(data)
        var Book_id = data.Book_id
        var token = store.getState().token
        removebook(Book_id, token).then(res => {
            if (res.code == 2000) {
                message.success('删除成功!');
                this.getdata()
            }
        })
    }
    onCreate = values => {
        // console.log('Received values of form: ', values);
        // setVisible(false);
        this.setState({
            visible: false
        })
        this.getdata()
    };
    async Turnpages(page, size) {
        await this.setState({
            page: page,
            size: size
        })
        this.getdata()
    }
    changecate = (val) => {
        this.setState({
            category: val
        })
    }
    render() {
        const { Search } = Input;
        const { Option } = Select;
        const { Column } = Table;

        return (<Fragment> <Input.Group>
            <Select defaultValue={"Author"} onChange={this.changecate} style={{ width: 100 }}>
                <Option value="Author">作者</Option>
                <Option value="Book_id">书本ID</Option>
                <Option value="Type">分类</Option>
            </Select>
            <Search
                placeholder="input search text"
                onSearch={value => this.storysearch(value)}

                style={{ width: 200 }}
            /> <Button type="primary" style={{ float: "right" }} onClick={() => {
                this.setState({
                    visible: true, mark: true
                });
            }}>添加新书</Button></Input.Group>

            <Divider />
            <div>
                <Table dataSource={this.state.list} pagination={false} >
                    <Column title="Book_id" dataIndex="Book_id" />
                    <column title="Picture" dataIndex="image" render={(image) => <img src={image} style={{ width: 60 }} />} />
                    <Column title="Bookname" dataIndex="Bookname" />
                    <Column title="Type" dataIndex="Type" />
                    <Column title="Author" dataIndex="Author" />
                    <Column title="Tags" dataIndex="tag"
                        dataIndex='tag'
                        render={tags => (
                            <Fragment>
                                {tags.map(tag => {
                                    let color = tag.length > 3 ? 'geekblue' : 'green';
                                    if (tag === '爽文') {
                                        color = 'volcano';
                                    }
                                    if (tag == "暧昧") {
                                        color = "magenta"
                                    }
                                    if (tag == "重生") {
                                        color = "red"
                                    }
                                    if (tag == "都市") {
                                        color = "red"
                                    }
                                    if (tag == "修炼") {
                                        color = "gold"
                                    }
                                    if (tag == "玄术") {
                                        color = "purple"
                                    }
                                    if (tag == "励志") {
                                        color = "lime"
                                    }
                                    if (tag == "热血") {
                                        color = "cyan"
                                    }
                                    return (
                                        <Tag color={color} key={tag}>
                                            {tag.toUpperCase()}
                                        </Tag>
                                    );
                                })}
                            </ Fragment>
                        )}
                    />

                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="small">
                                <Button type="primary" ghost onClick={() => { this.setState({ rowinfo: record, visible: true, mark: false }); }}>Update</Button>
                                <Button type="danger" ghost onClick={() => { this.remove(record) }}>Delete</Button>
                            </Space>
                        )}
                    />
                </Table>

                <Pagination
                    total={this.state.listtotal}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={10}
                    defaultCurrent={1}
                    pageSize={this.state.size}
                    onChange={(page, pagesize) => { this.Turnpages(page, pagesize) }}

                />
            </div>
            <CollectionCreateForm
                visible={this.state.visible}
                onCreate={this.onCreate}
                onCancel={() => {
                    this.setState({ visible: false });
                }}
                rowinfo={this.state.rowinfo}
                mark={this.state.mark}
            />


        </Fragment>)
    }
}
// function Story(props) {
//     const [listtotal, setlisttotal] = useState(1)
//     const [category, setcategory] = useState("author")
//     const [page, setpage] = useState(1)
//     const [size, setsize] = useState(10)
//     const [list, setlist] = useState([])
//     const { Search } = Input
//     const { Option } = Select;
//     const { Column } = Table;

//     // var rowinfo = ""
//     const [rowinfo, setrowinfo] = useState("")

//     useEffect(() => {

//         getdata()
//         console.log(list)
//     }, [page, size]);
//     function storysearch(val) {
//         console.log(val)
//     }
//     function Turnpages(page, size) {
//         setsize(size)
//         setpage(page)
//     }
//     async function getdata() {
//         let condition = {
//             type: "story",
//             page: page,
//             size: size,
//         }
//         await init(condition).then(res => {
//             console.log(res.data);
//             let list = res.data.map(item => {
//                 item.key = item.Book_id
//                 return item
//             })
//             setlist(list)
//             let total = res.total
//             setlisttotal(total)
//         })
//     }
//     async function storysearch(val) {
//         console.log(val)
//         let condition = {
//             Type: "storylist",
//             category: category,
//             info: val,
//             token: store.getState().token
//         }
//         await search(condition).then(res => {
//             console.log(res)
//             if (res.code === 2000) {
//                 let list = res.data.p.map(item => {
//                     item.key = item.Book_id
//                     return item
//                 })
//                 setlist(list)
//             } else {
//                 message.error('查询失败');
//                 getdata()
//             }

//         })
//     }
//     useEffect(() => {
//     }, [category])
//     function cc(val) {//修改搜索分类
//         setcategory(val)
//     }

//     function remove(data) {
//         console.log(data)
//         var Book_id = data.Book_id
//         var token = store.getState().token
//         removebook(Book_id, token).then(res => {
//             if (res.code == 2000) {
//                 message.success('删除成功!');
//                 getdata()
//             }
//         })
//     }

//     const [visible, setVisible] = useState(false);

//     const onCreate = values => {
//         console.log('Received values of form: ', values);
//         setVisible(false);
//     };

//     return (<> <Input.Group>
//         <Select defaultValue="Author" onChange={cc} style={{ width: 100 }}>
//             <Option value="Author">作者</Option>
//             <Option value="Book_id">书本ID</Option>
//             <Option value="Type">分类</Option>
//         </Select>
//         <Search
//             placeholder="input search text"
//             onSearch={value => storysearch(value)}

//             style={{ width: 200 }}
//         /> <Button type="primary" style={{ float: "right" }} onClick={() => {
//             setVisible(true);
//         }}>添加新书</Button></Input.Group>

//         <Divider />
//         <div>
//             <Table dataSource={list} pagination={false} >
//                 <Column title="Book_id" dataIndex="Book_id" />
//                 <column title="Picture" dataIndex="image" render={(image) => <img src={image} style={{ width: 60 }} />} />
//                 <Column title="Bookname" dataIndex="Bookname" />
//                 <Column title="Type" dataIndex="Type" />
//                 <Column title="Author" dataIndex="Author" />
//                 <Column title="Tags" dataIndex="tags" />

//                 <Column
//                     title="Action"
//                     key="action"
//                     render={(text, record) => (
//                         <Space size="small">
//                             <Button type="primary" ghost onClick={() => { setrowinfo(record); setVisible(true); }}>Update</Button>
//                             <Button type="danger" ghost onClick={() => { remove(record) }}>Delete</Button>
//                         </Space>
//                     )}
//                 />
//             </Table>

//             <Pagination
//                 total={listtotal}
//                 showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
//                 defaultsize={10}
//                 defaultCurrent={1}
//                 onChange={(page, pagesize) => { Turnpages(page, pagesize) }}
//             // pageSizeOptions={[5, 10, 20]}
//             />
//         </div>
//         <CollectionCreateForm
//             visible={visible}
//             onCreate={onCreate}
//             onCancel={() => {
//                 setVisible(false);
//             }}
//             rowinfo={rowinfo}
//             setrowinfo={setrowinfo}
//         />


//     </>)
// }

const CollectionCreateForm1 = ({ visible, onCreate, onCancel, rowinfo, setrowinfo }) => {
    const { Option } = Select
    var rowinfo1 = {
        Author: "花幽山月",
        Book_id: 6725806,
        Bookname: "我的绝色总裁未婚妻",
        Type: "city",
        clicktotal: "5",
        image: "http://img-tailor.11222.cn/bcv/big/201803141444064795.jpg",
        introduce: "主角：沈浪 苏若雪【最火爆畅销书】本书又名《神级龙卫》神秘高手龙潜花都，与冰山美女总裁签订婚约，但无奈被嫌弃。可怜的沈浪，只得外出觅食。不料一个个美女接踵而至，沈浪陷入各种桃运漩涡。当然，最主要的还是征服冰山女总裁。不乖？调教一下就好。",
        key: 6725806,
        tags: "异能,都市,暧昧"
    }
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

    const plainOptions = ['热血', '校园', '轻松', "爽文", "异能", "重生", "公主", "异术超能", "HE", "暧昧", "YY", "美人", "都市", "穿越", "励志", "修炼", "玄术"];
    const [form] = Form.useForm();
    return (
        <Modal
            destroyOnClose
            visible={visible}
            title="小说信息"
            okText="提交"
            cancelText="取消"
            onCancel={() => {
                form.resetFields()
                form.validateFields()
                console.log()
                onCancel()
            }}
            onOk={() => {
                form.validateFields()
                form.resetFields();
                onCreate();

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
                    "tags": rowinfo.tags
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
                <Form.Item label="小说封面" rules={[{ required: true, message: "请选择小说封面图片" }]}>
                    <Upload {...upload}>
                        <Button>
                            <UploadOutlined /> Click to Upload
            </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};



export default Story