import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import './App.css';

function App() {
    // State to hold the list of To-Do items
    const [todos, setTodos] = useState([]);
    // State to hold the value of the new To-Do input field
    const [newTodoTitle, setNewTodoTitle] = useState('');
    // State for loading or error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch todos when the component mounts
    useEffect(() => {
        loadTodos();
    }, []);

    // Function to fetch todos from the backend
    const loadTodos = async () => {
        try {
            setLoading(true);
            const data = await getAllTodos();
            setTodos(data);
            setError(null);
        } catch (err) {
            setError('Failed to connect to the server. Is it running?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handler for submitting a new To-Do
    const handleAddTodo = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        if (!newTodoTitle.trim()) return; // Don't add empty todos

        try {
            const newTodo = await createTodo(newTodoTitle);
            // Add the new todo to the list
            setTodos([...todos, newTodo]);
            // Clear the input field
            setNewTodoTitle('');
        } catch (err) {
            console.error('Error adding todo:', err);
            alert('Failed to add To-Do.');
        }
    };

    // Handler for toggling the completion status of a To-Do
    const handleToggleComplete = async (todo) => {
        try {
            const updatedTodo = await updateTodo(todo.id, {
                ...todo,
                completed: !todo.completed
            });
            // Update the state with the new list
            setTodos(todos.map(t => (t.id === todo.id ? updatedTodo : t)));
        } catch (err) {
            console.error('Error updating todo:', err);
            alert('Failed to update To-Do.');
        }
    };

    // Handler for deleting a To-Do
    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            // Remove the deleted todo from the state
            setTodos(todos.filter(t => t.id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
            alert('Failed to delete To-Do.');
        }
    };

    return (
        <div className="app-container">
            <div className="todo-app">
                <header>
                    <h1>My Tasks</h1>
                    <p className="subtitle">Keep track of your daily goals</p>
                </header>

                {error && <div className="error-message">{error}</div>}

                {/* Form to add a new To-Do */}
                <form className="add-todo-form" onSubmit={handleAddTodo}>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={newTodoTitle}
                        onChange={(e) => setNewTodoTitle(e.target.value)}
                        className="todo-input"
                    />
                    <button type="submit" className="add-btn">Add</button>
                </form>

                {/* Display loading state or the list of To-Dos */}
                {loading ? (
                    <p className="loading-message">Loading...</p>
                ) : (
                    <TodoList 
                        todos={todos} 
                        onToggleComplete={handleToggleComplete} 
                        onDelete={handleDelete} 
                    />
                )}
            </div>
        </div>
    );
}

export default App;
