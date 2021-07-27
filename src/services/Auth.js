const authRoute = process.env.REACT_APP_BACK_URL + "/api/auth";

export const signIn = async (credentials) => {
    const url = authRoute + "/signin";

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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