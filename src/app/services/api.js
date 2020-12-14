import axios from 'axios';

const createAxiosObject = () => {

    const headers = {'Content-Type':'application/json', 'Accepts':'application/json'};
    const API = axios.create({
        baseURL:'https://speakthenews.herokuapp.com/api/v1/',
        headers:headers
    })

    return API;
}

export default createAxiosObject;