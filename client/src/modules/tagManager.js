const baseUrl = '/api/Tag';

export const GetAllTags = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
}












const PTUrl = '/api/ProjectTag';


export const GetAllProjectTags = () => {
    return fetch(PTUrl)
        .then((res) => res.json())
}

export const addProjectTag = (projectTag) => {
    return fetch(PTUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectTag),
    })
        .then((resp) => resp.json())
}

export const deleteProjectTag = (id) => {
    return fetch(`${PTUrl}?id=${id}`, {
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
}