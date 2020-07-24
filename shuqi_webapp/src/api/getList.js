import server from "./server"

export default {
    //首页数据
    GetBook(){
        return server({
            url:'/bookstore/miniapp',
            method:'post'
        })
    }
}