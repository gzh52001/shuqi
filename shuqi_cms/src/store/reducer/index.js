
const initialState = {
    logined: false,
    token: "111"
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case "INC":
            return { ...state, ...payload }

        default:
            return state
    }
}
