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
        componentWillMount() {
            let token = localStorage.getItem("shuqi_cms")
            if (token != null) {
                this.setState({
                    loginState: true
                })
            }
            super.componentWillMount();
        }
        render() {
            const { loginState } = this.state
            if (loginState) {
                return super.render()
            } else {
                this.props.history.push("/login")
                return null
            }
        }
    }
    return Outer
}