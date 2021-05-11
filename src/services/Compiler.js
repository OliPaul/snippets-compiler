const compile = async (token, codeValue, language = "c") => {

    const url = process.env.REACT_APP_BACK_URL + "/compiler/" + language;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: codeValue,
    });

    response = await response.text();

    return response;
}

module.exports ={
    compile
}