const compile = async (codeValue, language = "c") => {
    const url = process.env.BACK_URL + "/compiler/" + language;

    const response = await fetch(url, codeValue);
    return response.body;
}

module.exports ={
    compile
}