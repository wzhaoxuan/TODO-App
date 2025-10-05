import axios from 'axios';

const URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodos = () => api.get('/todos');
export const createTodo = (data) => api.post('/todos', data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const deleteAllTodos = () => api.delete('/todos');

export default api;