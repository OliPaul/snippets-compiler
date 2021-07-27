
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

export const compile = async (token, snippetsId, projectId, language = "c") => {

    const url = process.env.REACT_APP_BACK_URL + "/api/compiler";

    const compilationData = {
        snippetsId: snippetsId,
        projectId: projectId
    }

    let response = await fetch(url, {
        method: 'POST',
        agent: httpsAgent,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(compilationData),
    });

    response = await response.json();

    return response;
}
