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
    return "fiver"
}