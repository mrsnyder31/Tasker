import { getToken } from "./authManager";


const baseUrl = '/api/Project';

export const GetAllProjects = () => {
    // return getToken().then((token) => {
    return fetch(baseUrl, {
        method: "GET"
        // ,
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    })
        .then((res) => res.json())
    // })
}

export const GetProjectById = (id) => {
    // return getToken().then((token) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "GET"
        // ,
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    }).then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error(
                "An unknown error occurred while trying to get projects.",
            );
        }
    });
    // })
};

export const addProject = (project) => {
    // return getToken().then((token) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    })
        .then((resp) => resp.json())
    // })
};

export const deleteProject = (id) => {
    // return getToken().then((token) => {
    return fetch(`${baseUrl}?id=${id}`, {
        method: "DELETE"
        // ,
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    }).then((resp) => {
        if (resp.ok) {
            return resp;
        } else {
            throw new Error(
                "An unknown error occurred while trying to delete a project.",
            );
        }
    });
    // })
};

export const editProject = (project) => {
    // return getToken().then((token) => {
    return fetch(`${baseUrl}/${project.id}`, {
        method: "PUT",
        headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    })
        .then((resp) => { return resp; })
    // })
}