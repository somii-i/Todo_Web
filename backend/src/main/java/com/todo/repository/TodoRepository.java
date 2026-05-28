package com.todo.repository;

import com.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for database operations on Todo entities.
 * By extending JpaRepository, we get built-in methods like save(), findAll(), findById(), deleteById() for free.
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Custom query methods can be added here if needed, but JpaRepository provides all basic CRUD operations.
}
