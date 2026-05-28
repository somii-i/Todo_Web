import React from 'react';
import TodoItem from './TodoItem';

/**
 * Component to display the list of To-Do items.
 * Receives the list of todos and passes the toggle and delete functions down to TodoItem.
 */
function TodoList({ todos, onToggleComplete, onDelete }) {
    // If the list is empty, show a friendly message
    if (todos.length === 0) {
        return <p className="empty-message">No To-Dos yet. Add one above!</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TodoList;
