import axios from 'axios';
import { config } from '~/assets/api/config';

class Api {

    constructor (url) {
        this.apiUrl = url
        this.configHeader = { 
            headers: { 'Content-Type': 'application/json' } 
        }
    }

    register (jsonData) {
        return axios
            .post(this.apiUrl + config.api.register, jsonData, this.configHeader)
            .then(({ data }) => { return { data } })
            .catch(err => { return { error: err } })
    }

    login (jsonData) {
        return axios
            .post(this.apiUrl + config.api.login, jsonData, this.configHeader)
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

    updateUser (jsonData, authObject) {

        if (authObject.role === 1) {
            return axios
                .put(this.apiUrl + config.api.usersStudent, jsonData, { 
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authObject.token}`
                    }
                })
                .then(({ data }) => { return { data } })
                .catch(err => { return { error: err } })
        }
        else {
            return axios
                .put(this.apiUrl + config.api.usersCompany, jsonData, { 
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authObject.token}`
                    }
                })
                .then(({ data }) => { return { data } })
                .catch(err => { return { error: err } })
        }
    }

    getCurrentUser (authObject) {

        if (authObject.role === 1) {
            return axios
                .get(this.apiUrl + config.api.getUsersStudent, {
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authObject.token}`
                    }
                })
                .then(({ data }) => {
                    let currentUser = data.find(({ id }) => id === authObject.id)
                    return { user: currentUser }
                })
                .catch(err => { return { error: err } })
        } 
        else {
            return axios
                .get(this.apiUrl + config.api.getUsersCompany, {
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authObject.token}`
                    }
                })
                .then(({ data }) => {
                    let currentUser = data.find(({ id }) => id === authObject.id)
                    return { user: currentUser }
                })
                .catch(err => { return { error: err } })
        }
    }
}

const api = new Api(config.baseUrl)

export default api