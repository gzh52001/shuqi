import React, { useState, useEffect } from "react"
import { Modal, Form, Select, Input, Button, Upload, message, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateStory, insertStory } from "./../api"
import store from "./../store"
export const CollectionCreateForm = ({ visible, onCreate, onCancel, rowinfo, mark }) => {
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
    const [info, setinfo] = useState("")

    const plainOptions = ['热血', '校园', '轻松', "爽文", "异能", "重生", "公主", "异术超能", "HE", "暧昧", "YY", "美人", "都市", "穿越", "励志", "修炼", "玄术"];
    const [form] = Form.useForm();
    useEffect(() => {
        setinfo(rowinfo)
        if (!mark) {

            form.setFieldsValue({
                "Book_id": rowinfo.Book_id,
                "Bookname": rowinfo.Bookname,
                "Author": rowinfo.Author,
                "Type": rowinfo.Type,
                "introduce": rowinfo.introduce,
                "tags": rowinfo.tags
            })
        } else {
            form.resetFields()
        }
    }, [mark, form, rowinfo])
    return (
        <Modal
            getContainer={false}
            destroyOnClose={true}
            // afterClose={() => {
            //     setinfo(null)
            // }}
            visible={visible}
            title="Create a new collection"
            okText="提交"
            cancelText="取消"
            onCancel={() => {
                form.setFieldsValue({})
                form.resetFields()
                setinfo("")
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
                            clicktotal: 1111
                        }
                        if (mark) {
                            insertStory(condition).then(res => {
                                console.log(res)
                                if (res.code === 200) {
                                    message.success("插入成功")
                                } else {
                                    message.error("插入失败")
                                }
                            })
                        } else {
                            updateStory(condition).then(res => {
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
                    name="Book_id"
                    label="Id"
                    rules={[
                        {
                            required: true,
                            message: '请输入Id',
                        },

                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Bookname"
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
                    name="Author"
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
                    name="Type"
                    label="类别"
                    rules={[{
                        required: true,
                        message: "请选择小说分类"
                    }]}
                >
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
                    name="introduce"
                    label="概述"
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
