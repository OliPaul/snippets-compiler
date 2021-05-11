import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        const userToken = JSON.parse(userInfo);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('userInfo', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}