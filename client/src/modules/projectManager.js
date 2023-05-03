const baseUrl = '/api/Project';

export const GetAllProjects = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
}