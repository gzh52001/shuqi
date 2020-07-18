import React, { Component } from 'react'
import PageLayout from '../../layout/PageLoyout'
import axios from "axios"
export default class Car extends Component {
    async componentDidMount() {
           await axios.get("/api/novel/i.php?do=sp_get&bookId=7429818&fetch=merge&sqUid=8000000&source=store&size=3&page=1&score=yes&authorId=111")
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
        await axios.get("/gpu_data/novel/i.php?id=8000000&do=is_payreco&qtf=alipayApp&qtn=cpcover&nums=3&platform=0&bids=7429818")
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
        await axios.get("/shuqi_i/goods/fuckbook?page=1&size=10&Type=xuanhuan")
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })

    }
    render() {
        return (
            <PageLayout>
                书架
            </PageLayout>
        )
    }
}
