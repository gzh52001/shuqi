import {createStore} from "redux"

const initState = {
    bookList:[],
    
}


//reducer
//指定state的修改逻辑 会返回一个新的state 创建一个新的并覆盖旧的
function reducer(state=initState,action){
    switch(action.type){
        
       //添加书本
        case 'add_to_book':
            //返回一个新的state，这个state会自动覆盖旧的
            return{
                ...state,
                bookList:[action.books,...state.bookList]
            }
       //添加书本
        case 'add_to_search':
            //返回一个新的state，这个state会自动覆盖旧的
            return{
                ...state,
                bookList:[action.books,...state.bookList]
            }
       //删除书本
        case 'clear_to_search':
            //返回一个新的state，这个state会自动覆盖旧的
            return{
                ...state,
                bookList:[]
            }
       //删除书本

        case 'remove_from_cart':
            return{
                ...state,
                bookList:state.bookList.filter(item=>item.bid!=action.bid)
            }
        default:
            return state;    
    }   
    

}

const store = createStore(reducer);

export default store

// console.log('store',store);

