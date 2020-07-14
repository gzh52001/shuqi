import axios from "./../utils/request"
export const login = (username, password) => {
    return axios.post("/login", { username, password })
}