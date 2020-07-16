import axios from "./../utils/request"
export const login = (username, password) => {
    return axios.post("/login", { username, password })
}
export const init = (type) => {
    console.log(type)
    return axios.get("/getdata", {
        params: {
            type
        }
    })
}
export const search = (data) => {
    console.log(data)
    return axios.get("/search", {
        params: {
            data
        }
    })
}