import React from 'react';

/**
 * Component to display a single To-Do item.
 * Receives the item data and functions to toggle completion and delete as props.
 */
function TodoItem({ todo, onToggleComplete, onDelete }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {/* Checkbox to toggle completion status */}
            <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => onToggleComplete(todo)} 
            />
            
            {/* The title of the To-Do item */}
            <span className="todo-title">{todo.title}</span>
            
            {/* Button to delete the To-Do item */}
            <button className="delete-btn" onClick={() => onDelete(todo.id)}>
                Delete
            </button>
        </li>
    );
}

export default TodoItem;
