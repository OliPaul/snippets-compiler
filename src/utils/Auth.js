export const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
}

export const getUsername = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const username = userInfo.username;
    return username;
}