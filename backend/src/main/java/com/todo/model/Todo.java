package com.todo.model;

import jakarta.persistence.*;

/**
 * Entity representing a To-Do item in the database.
 * The @Entity annotation tells Spring Data JPA that this class maps to a database table.
 */
@Entity
@Table(name = "todos")
public class Todo {

    // Primary key for the database table, auto-generated
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The text of the to-do item, cannot be null
    @Column(nullable = false)
    private String title;

    // Status of the to-do item (completed or not)
    @Column(nullable = false)
    private boolean completed;

    // Default constructor required by JPA
    public Todo() {
    }

    public Todo(String title, boolean completed) {
        this.title = title;
        this.completed = completed;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
