import axios from 'axios';

const postCall = ({ method, url }) => {
    return axios({
        url,
        method: method || 'GET',
    });
};

export default postCall;
