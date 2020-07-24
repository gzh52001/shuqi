import React from "react"
import { Input, Select, Divider, Pagination, Table, Tag, Space, Button, Upload, message, Checkbox, Modal, Radio, Form, Alert } from "antd"
import { UploadOutlined } from '@ant-design/icons';
class Mymodal extends React.Component {
    constructor() {
        super()
    }
    // = ({ visible, onCreate, onCancel, this.props.rowinfo, setthis.props.rowinfo }) => 
    render() {
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
                visible={this.props.visible}
                title="小说信息"
                okText="提交"
                cancelText="取消"
                onCancel={() => {
                    form.resetFields()
                    form.validateFields()
                    console.log()
                    this.props.onCancel()
                }}
                onOk={() => {
                    form.validateFields()
                    form.resetFields();
                    this.props.onCreate();

                }}
            >
                <Form
                    form={form}

                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        "bookname": this.props.rowinfo.Bookname,
                        "author": this.props.rowinfo.Author,
                        "category": this.props.rowinfo.category,
                        "summary": this.props.rowinfo.summary,
                        "tags": this.props.rowinfo.tags
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
                        initialValue={this.props.rowinfo.Type}>
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
                        initialValue={this.props.rowinfo.introduce}
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
    }

};
export default Mymodal