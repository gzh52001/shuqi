import axios from "./require"

export default{
    getZhangjie(page,size){
        return axios({
            method:"get",
            url:'/goods/section',
            data:{
                page,size
            }
        })
    }   
}