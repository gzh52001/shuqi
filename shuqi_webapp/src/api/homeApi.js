import server from "../utils/server"

export default {
    //首页数据
    GetBook(){
        return server({
            url:'/bookstore/miniapp',
            method:'post',
            data: {
                authCode: "xxx",
                channelId: "xxx",
                osName: "xxx",
                osVer: "xxx",
                page: "home",
                platform: 0,
                userId: 88481086
            }
        })
    },
    // 相关数据
    GetRelevant(id){
        // console.log('id',id);
        return server({
            url:'/bookstore/miniapp/model/update',
            method:'post',
            data: {
                authCode: "xxx",
                channelId: "xxx",
                modelId: id,
                osName: "xxx",
                osVer: "xxx",
                page: "home",
                platform: 0,
                userId: 8000000
            }
        })
    }
}