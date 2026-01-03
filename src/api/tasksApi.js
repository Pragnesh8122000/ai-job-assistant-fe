import axios from './axios'; // Assuming there is a configured axios instance

export const fetchTasks = async (params) => {
    const { data } = await axios.get('/tasks', { params });
    return data;
};

export const createTask = async (taskData) => {
    const { data } = await axios.post('/tasks', taskData);
    return data;
};

export const updateTask = async (id, taskData) => {
    const { data } = await axios.put(`/tasks/${id}`, taskData);
    return data;
};

export const deleteTask = async (id) => {
    const { data } = await axios.delete(`/tasks/${id}`);
    return data;
};

export const fetchTaskActivity = async (id) => {
    const { data } = await axios.get(`/tasks/${id}/activity`);
    return data;
}
