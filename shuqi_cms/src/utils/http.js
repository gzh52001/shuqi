const baseUrl = process.env.NODE_ENV === 'development' ? 'http://www.nanshig.com' : ""
//url：路径  data:参数  options：类型
export async function request(url, data = {}, options = {}) {
    url = baseUrl + url;
    console.log(options)
    if (options.method === "get" || options.get == undefined) {
        const params = []
        for (let key in data) {
            params.push(`${key}=${data[key]}`)
        }
        url = url + (url.includes("?") ? "&" : "?") + params.join("&")
    } else if (['post', 'put', 'patch'].includes(options.method)) {
        data = JSON.stringify(data)
        options.headers['content-type'] = 'application/json'
    }
    return await fetch(url, {
        ...options,
        data,
    }).then(res => res.json())
}
export function post(url, data, options = { method: "post" }) {
    return request(url, data, options)
}

export function get(url, data, options) {
    console.log("data" + JSON.stringify(data))

    return request(url, data, options)
}

export function put(url, data, options = { method: "put" }) {
    return request(url, data, options)
}

export function patch(url, data, options = { method: "patch" }) {
    return request(url, data, options)
}

export default {
    request,
    get,
    post,
    put,
    patch
}