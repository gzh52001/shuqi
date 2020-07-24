
const initialState = {
    logined: false,
    token: localStorage.getItem("shuqi_cms"),
    user: localStorage.getItem("shuqi_cms_user")
}

export default (state = initialState, { type, token }) => {
    switch (type) {

        case "login":

            return { ...state, ...token }

        default:
            return state
    }
}
