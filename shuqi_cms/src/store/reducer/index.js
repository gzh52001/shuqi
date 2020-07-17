
const initialState = {
    logined: false,
    token: localStorage.getItem("shuqi_cms"),
    user: localStorage.getItem("shuqi_cms_user")
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "INC":
            return { ...state, ...payload }

        default:
            return state
    }
}
