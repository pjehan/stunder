import axios from 'axios';
import { config } from '~/assets/api/config';

class Api {

    constructor (url) {
        this.apiUrl = url
        this.config = { headers: { 'Content-Type': 'application/json' } }
    }

    register (jsonData) {
        return axios
            .post(this.apiUrl + config.api.register, jsonData, this.config)
            .then(({ data }) => { return { data } })
            .catch(err => { return { error: err } })
    }

    login (jsonData) {
        return axios
            .post(this.apiUrl + config.api.login, jsonData, this.config)
            .then(({ data }) => { return { user: data } })
            .catch(err => { return { error: err } })
    }

    userStudent (token) {
        return axios
            .post(this.apiUrl + config.api.usersStudent, null, { 
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(({ data }) => { return { data } })
            .catch(err => { return { error: err } })
    }

    userCompany (token) {
        console.log(this.apiUrl + config.api.usersCompany);
        
        return axios
            .post(this.apiUrl + config.api.usersCompany, null, { 
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(({ data }) => { return { data } })
            .catch(err => { return { error: err } })
    }

    // /**
    //  * @return {Promise} List of all users
    //  */
    // getCurrentUser (name) {

    //     return axios
    //         .get(`${this.apiUrl}/users`)
    //         .then(({ data }) => {
    //             let users = data['hydra:member']
    //             let currentUser = users.find(({ username }) => username === name)

    //             return { user: currentUser }
    //         })
    //         .catch(e => { return { error: e } })
    // }
}

const api = new Api(config.baseUrl)

export default api