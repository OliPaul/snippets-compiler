const compile = async (token, snippetsId, projectId, language = "c") => {

    const url = process.env.REACT_APP_BACK_URL + "/compiler";

    const compilationData = {
        snippetsId: snippetsId,
        projectId: projectId
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(compilationData),
    });

    response = await response.json();

    return response;
}

module.exports ={
    compile
}