import axios from "axios"
var services = axios.create({
    baseURL: "/shuqi",
    timeout: 3000,
    headers: {
        "content-type": "application/json"
    }
})

export default services