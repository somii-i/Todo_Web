package com.todo.controller;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for managing To-Do items.
 * Maps HTTP requests to database operations.
 */
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    /**
     * GET /api/todos - Retrieve all to-do items from the database.
     * @return List of to-do items
     */
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    /**
     * POST /api/todos - Create a new to-do item.
     * @param todo The to-do item sent in the request body
     * @return The saved to-do item
     */
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    /**
     * PUT /api/todos/{id} - Update an existing to-do item (e.g., toggle completion).
     * @param id The ID of the to-do item to update
     * @param todoDetails The updated to-do item details sent in the request body
     * @return The updated to-do item or 404 Not Found if it doesn't exist
     */
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);

        if (optionalTodo.isPresent()) {
            Todo existingTodo = optionalTodo.get();
            // Update fields
            existingTodo.setTitle(todoDetails.getTitle());
            existingTodo.setCompleted(todoDetails.isCompleted());
            // Save and return
            Todo updatedTodo = todoRepository.save(existingTodo);
            return ResponseEntity.ok(updatedTodo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE /api/todos/{id} - Delete a to-do item by its ID.
     * @param id The ID of the to-do item to delete
     * @return 204 No Content if successful, or 404 Not Found if it doesn't exist
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
