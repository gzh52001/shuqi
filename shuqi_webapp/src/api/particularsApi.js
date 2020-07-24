import server from "../utils/server"
import Axios from "axios"

export default {
    // 相关数据
    GetRelevant() {
        return server({
            url: '/bookstore/miniapp/model/update',
            method: 'post',
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
    //评论数据,page:页码，size:每页条数
    getComment3(uid="7033694",size="3",page="1"){   
        if(!uid)uid="7033694"
        return Axios({
            methods: 'get',
            url: '/api/novel/i.php',
            params: {
                do: 'sp_get',
                bookId: uid,
                fetch: 'merge',
                sqUid: 88481086,
                source: 'store',
                size,
                page,
                score: 'yes',
                authorId: '11'
            }
        })
    },
    //自己数据库的评论数据
    getComment(size = "3", page = "1") {
        return Axios({
            methods: 'get',
            url: '/shuqi_i/coms/comList',
            // url: '/com_api/coms/comList',
            params: {
                size,
                page
            }
        })
    },
    // 添加
    addComt(mid, nickName, text, pubTime) {
        // console.log("增加评论接口", mid, nickName, text, pubTime);
        return Axios({
            method: 'post',
            url: '/shuqi_i/coms/add',
            // url: '/com_api/coms/add',
            data: {
                mid,
                nickName,
                text,
                pubTime,
                zanNum: '0',    
                replyNum: '0'
            }
        })
    },
    // 删除
    removeComt(text) {
        // console.log("删除评论接口", text);
        return Axios({
            method: 'delete',
            url: '/shuqi_i/coms/del',
            // url: '/com_api/coms/del',
            params: {
                text
            }
        })
    },
    // 查询用户名为nickName的評論
    getsss(Name) {
        // console.log("查询接口", Name);
        return Axios({
            method: 'get',
            url: '/shuqi_i/coms/username',
            // url: '/com_api/coms/username',
            params: {
                nickName:Name
            }
        })
    },
    // 点赞
    putNum(text) {
        // console.log("点赞", text);
        return Axios({
            method: 'put',
            url: '/shuqi_i/coms/nums',
            // url: '/com_api/coms/nums',
            data: {
                text
            }
        })
    }
}


