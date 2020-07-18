import server from "../utils/server"
import Axios from "axios"

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
    },
    //评论数据
    getComment(uid){
        return Axios({
            methods: 'get',
            url: '/api/novel/i.php',
            params: {
                do: 'sp_get',
                bookId: uid,
                fetch: 'merge',
                sqUid: 88481086,
                source: 'store',
                size: 3,
                page: 1,
                score: 'yes',
                authorId: '11'
            }
        })
    }

}