const baseUrl = '/api/Project';

export const GetAllProjects = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
}

export const GetProjectById = (id) => {

    return fetch(`${baseUrl}/${id}`).then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error(
                "An unknown error occurred while trying to get projects.",
            );
        }
    });
};

export const addProject = (project) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    })
        .then((resp) => resp.json())
};

export const deleteProject = (id) => {
    return fetch(`${baseUrl}?id=${id}`, {
        method: "DELETE"
    }).then((resp) => {
        if (resp.ok) {
            return resp;
        } else {
            throw new Error(
                "An unknown error occurred while trying to delete a project.",
            );
        }
    });
};

export const editProject = (project) => {
    return fetch(`${baseUrl}/${project.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    })
        .then((resp) => { return resp; })

}