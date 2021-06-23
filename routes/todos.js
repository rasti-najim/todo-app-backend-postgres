const express = require("express");
const _ = require("lodash");
const pool = require("../db");
const auth = require("../middleware/auth");

const router = express.Router();

// * get all todos and name
router.get("/", auth, async (req, res) => {
  try {
    // const todos = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
    //   req.user.id,
    // ]);
    const todos = await pool.query(
      "SELECT users.username, todos.todo_id, todos.description FROM users JOIN todos ON users.id = todos.user_id WHERE users.id = $1",
      [req.user.id]
    );
    res.send(todos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// * get a todo
router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [
      req.params.id,
    ]);
    res.send(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// * create a todo
router.post("/", auth, async (req, res) => {
  try {
    const { description } = req.body;
    const todo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.send(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// * update a todo
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todos SET description = $1 WHERE user_id = $2 AND todo_id = $3 RETURNING *",
      [description, req.user.id, id]
    );
    res.send(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// * delete a todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    res.send(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
