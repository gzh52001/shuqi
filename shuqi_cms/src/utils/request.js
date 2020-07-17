import axios from "axios"
import React from "react"
import { Spin, Alert } from 'antd';
var services = axios.create({
    baseURL: "/shuqi",
    timeout: 3000,
    headers: {
        "content-type": "application/json"
    }
})
var spinning = true
services.interceptors.request.use((config) => {
    spinning = true
    return config;
})
services.interceptors.response.use((res) => {
    spinning = false
    return res.data;

})
export default services