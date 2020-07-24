import axios from "axios"
import {Toast} from "antd-mobile"

const server = axios.create({
    baseURL:"https://newbookstoreapi.shuqireader.com",
    timeout:5000
})



var toast = null;
server.interceptors.request.use((config) => {
    toast =  Toast.loading('Loading...', 1, () => {
        // console.log('Load complete !!!');
      });
    return config;
})
// server.interceptors.response.use((res) => {
//     toast.clear();
//     return res.data;

// })


export default server
