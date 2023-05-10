const baseUrl = '/api/Task';

export const GetAllTasks = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
}

export const addTask = (task) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
        .then((res) => res.json())
}

export const editTask = (task) => {
    return fetch(`${baseUrl}/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
        .then((res) => res)
}

export const deleteTask = (id) => {
    return fetch(`${baseUrl}?id=${id}`, {
        method: "DELETE"
    }).then((resp) => {
        if (resp.ok) {
            return resp;
        } else {
            throw new Error(
                "An unknown error occurred while trying to delete a task.",
            );
        }
    });
};