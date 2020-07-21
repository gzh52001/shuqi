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
    console.log("api:" + JSON.stringify(data))
    return axios.get("/goods/search", {
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

export const removeUser = (Id, token) => {
    return axios({
        url: "/user/del",
        method: "delete",
        data: {
            Id, token
        }
    })
}

export const updateStory = (data) => {
    console.log(data)
    return axios({
        url: "/goods/edit",
        method: "put",
        data: {
            ...data
        }
    })
}
export const insertStory = (data) => {
    console.log(data)
    return axios({
        url: "/goods/addbook",
        method: "post",
        data: {
            ...data
        }
    })
}



export const removeSection = (data) => {
    return axios({
        url: "section/delete",
        method: "delete",
        data: { ...data }
    })
}
export const insertSection = (data) => {
    console.log("api:" + JSON.stringify(data))
    return axios({
        url: "/section/insert",
        method: "post",
        data: {
            ...data
        }
    })
}
export const updateSection = (data) => {
    return axios({
        url: "/section/update",
        method: "put",
        data: {
            ...data
        }
    })
}
export const removeComment = (data) => {
    return axios({
        url: "/comment/remove",
        method: "delete",
        data: {
            ...data
        }
    })
}
export const comment = (data) => {
    return axios.get("/goods/comment", { params: { ...data } })
}