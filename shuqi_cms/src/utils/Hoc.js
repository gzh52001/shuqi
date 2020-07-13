import React from "react"
export function withLogin(Inner) {
    class Outer extends Inner {
        constructor() {
            super()
            if (!this.state) {
                this.state = {}
            }
            this.state.loginState = false
        }
        componentDidMount() {
            let token = localStorage.getItem("shuqi_cms")
            if (token.length > 0) {
                this.setState({
                    loginState: true
                })
            }
        }
        render() {
            let { loginState } = this.state
            if (loginState) {
                return super.render()
            } else {
                this.props.history.push("/login")
                return
            }
        }
    }
    return Outer
}