import React from "react"
import store from "../../../store"
class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = { n: store.getState().logined }
        console.log(this.props)
    }
    render() {
        return <>num:{this.state.n} </>
    }
}
export default Users