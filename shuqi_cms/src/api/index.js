import axios from "./../utils/request"
export const login = (username, password) => {
    console.log(username, password)
    return axios.post("/user/login", { Username: username, Password: password })
}
export const init = (data) => {
    console.log(data)

    return axios.get("/user/userlist", {
        params: {
            ...data
        }
    })
}
export const search = (data) => {
    console.log(data)
    return axios.get("/search", {
        params: {
            ...data
        }
    })
}
// export const removebook=(Book_id,token)=>{
//     return axios.delete("/goods/del",{Book_id,token})
// }
export const removebook = (Book_id, token) => {
    console.log(Book_id, token)
    return axios(
        {
            url: "/goods/del",
            method: "delete",
            data: {
                Book_id, token
            }
        }
    )
}