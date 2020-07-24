// import require from './require'
import axios from "./require"
export default {
    getBook(Type) {
        // console.log(page,size,type);
        return axios.get('/goods/checkbook',{
                    params:{
                        Type
                    }    
        })
    },
    getfuck(page,size,Type){
        return axios.get('/goods/fuckbook',{
            params:{
                page,size,Type
            }
        })
    },
    Hotfuck(page,size,Type){
        return axios.get('/goods/descfuck',{
            params:{
                page,size,Type
            }
        })
    }
}

