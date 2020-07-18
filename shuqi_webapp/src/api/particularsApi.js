import server from "../utils/server"

export default {
    // 相关数据
    GetRelevant(){
        return server({
            url:'/bookstore/miniapp/model/update',
            method:'post',
            data: {
                authCode: "xxx",
                channelId: "xxx",
                modelId: 8,
                osName: "xxx",
                osVer: "xxx",
                page: "home",
                platform: 0,
                userId: 8000000
            }
        })
    }

}