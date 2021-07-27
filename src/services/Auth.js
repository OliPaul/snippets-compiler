const authRoute = process.env.REACT_APP_BACK_URL + "/api/auth";
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

export const signIn = async (credentials) => {
    const url = authRoute + "/signin";

    let response = await fetch(url, {
        agent: httpsAgent,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify(credentials),
    });

    if(response.status === 200){
        response = await response.json();
    }else {
        response = {error: true};
    }

    return response;
}

export const signUp = async (userInfo) => {
    const url = authRoute + "/signup";

    let response = await fetch(url, {
        agent: httpsAgent,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify(userInfo),
    });

    if(response.status === 200){
        response = await response.json();
    }else {
        response = {error: true};
    }

    return response;
}
