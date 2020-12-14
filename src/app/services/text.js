import createAxiosObject from './api';

const getText = urlToFetch => {
    const API = createAxiosObject();
    const url = `/text?url=${urlToFetch}`;
    return API.get(url);
}

export default getText;