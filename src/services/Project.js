const projectRoute = process.env.REACT_APP_BACK_URL + "/api/projects";

const createProject = async (token, projectName, language) => {
    const url = projectRoute;

    const projectInfo = {
        name: projectName,
        language: language
    }

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(projectInfo),
    });

    if(response.status === 201){
        response = {error: false, location: response.headers.get("Location")};
    }else {
        response = {error: true};
    }

    return response;
}

const getProject = async (token, projectID, projectUrl) => {
    const url = projectID ? `${projectRoute}/${projectID}` : projectUrl;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if(response.status === 200){
        response = await response.json();
    }else {
        response = {error: true};
    }

    return response;
}

const joinProject = async (token, projectToken) => {
    const url = `${projectRoute}/join/${projectToken}`;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if(response.status === 201){
        response = response = {error: false, location: response.headers.get("Location")};
    }else {
        response = {error: true};
    }

    return response;
}

const getProjects = async (token) => {
    const url = projectRoute + "/me";

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if(response.status === 200){
        response = await response.json();
    }else {
        response = {error: true};
    }

    return response;
}

module.exports ={
    createProject,
    getProject,
    joinProject,
    getProjects
}