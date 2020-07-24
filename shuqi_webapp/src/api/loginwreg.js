import axios from './require'

export default {
    reguser(Username, Password) {
        return axios({
            method: 'post',
            url: '/user/reg',
            data: {
                Username,
                Password
            }
        })
    },
    loginuser(Username, Password, keep) {
        return axios({
            method: 'post',
            url: '/user/login',
            data: {
                Username, Password, keep
            }
        })
    },
    checkuser(Username) {
        return axios.get('/user/checkname', {
            params: {
                Username
            }
        })
    }
}