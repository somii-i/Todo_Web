// Base URL for the Spring Boot backend, reading from Vite's env vars
// It defaults to localhost if the env var is missing for local development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/todos';

/**
 * Fetch all To-Do items from the backend.
 * @returns {Promise<Array>} List of To-Do items
 */
export const getAllTodos = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

/**
 * Create a new To-Do item.
 * @param {string} title The title of the new To-Do
 * @returns {Promise<Object>} The created To-Do item
 */
export const createTodo = async (title) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
};

/**
 * Update an existing To-Do item (e.g., toggle completion status).
 * @param {number} id The ID of the To-Do item to update
 * @param {Object} todoDetails The updated details ({ title, completed })
 * @returns {Promise<Object>} The updated To-Do item
 */
export const updateTodo = async (id, todoDetails) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoDetails),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
};

/**
 * Delete a To-Do item.
 * @param {number} id The ID of the To-Do item to delete
 */
export const deleteTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
};
