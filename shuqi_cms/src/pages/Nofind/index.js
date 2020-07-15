import { Result, Button } from 'antd';
import React from "react"
class Nofind extends React.Component {
    gohome = () => {
        this.props.history.push("/")
    }
    render() {
        return (<Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={this.gohome}>Back Home</Button>}
        />)
    }

}
export default Nofind