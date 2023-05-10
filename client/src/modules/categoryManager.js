const baseUrl = '/api/Category';

export const GetAllCategories = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
}