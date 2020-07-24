import axios from "./require"
export default {
    Getcar(bookName,bookCover,bid,checked) {
        // console.log(page,size,type);
        return axios({
            method:'post',
            url:'/goods/addbooky',
            data:{
                bookName,bookCover,bid,checked
            }
        })
    },
    Getcarlist(page,size){
        return axios({
             method:"get",
             url:'/goods/cartlist',
             data:{
                page,size
             }
        })
    },
    delBook(ids){
        // console.log("接口id",ids);
        return axios({
            method:'delete',
            url:'/goods/delallbook',
            data:{
                ids
            }
        })
    }
}