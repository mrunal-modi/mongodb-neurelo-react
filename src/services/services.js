//services.js
import customAxios from "./customAxios"

export const _create = async (task) => {
    const currentTime = new Date().toISOString();
    const taskObject = [{
        "task": task,
        "created_at": currentTime,
        "updated_at": currentTime,
        "v": 1
    }];
    try {
        const response = await customAxios.post('/', taskObject);
        console.log("Create Response:", response.data); // Logging the response data
        return response.data; // Return only the data part of the response
    } catch (error) {
        throw error; // Rethrow the error for handling in the component
    }
}

export const _read = async () => {
    const params = {
        select: JSON.stringify({ task: true, id: true }) // Use default params
    };
    try {
        const response = await customAxios.get('/', { params });
        return response.data; // Return only the data part of the response
    } catch (error) {
        throw error; // Rethrow the error for handling in the component
    }
}

export const _count = async () => {
    try {
        const response = await customAxios.get('/__aggregate', {
            params: {
                select: JSON.stringify({ "_count": ["_all"] })
            }
        });
        return response.data.data._count._all; // Return the count of tasks
    } catch (error) {
        throw error; // Rethrow the error for handling in the component
    }
}

export const _update = async (taskId, newTask) => {
    try {
        const response = await customAxios.patch(`/${taskId}`, {
            "task": newTask
        });
        return response.data; // Return only the data part of the response
    } catch (error) {
        throw error; // Rethrow the error for handling in the component
    }
};


export const _delete = async (taskId) => {
    try {
        await customAxios.delete(`/${taskId}`);
    } catch (error) {
        throw error; // Rethrow the error for handling in the component
    }
};
