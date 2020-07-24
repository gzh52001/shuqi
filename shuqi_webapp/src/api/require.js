import axios from "axios"
import React from "react"

var services = axios.create({
    baseURL: "/shuqi_i",
    timeout: 3000,
    // headers: {
    //     "content-type": "application/json"
    // }
})
var spinning = true
services.interceptors.request.use((config) => {
    spinning = true
    return config;
})
services.interceptors.response.use((res) => {
    spinning = false
    return res.data;

})
export default services