CREATE DATABASE todo_app;

CREATE TABLE todos (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);