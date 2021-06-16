const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// * get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos");
    res.send(todos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// * get a todo
app.get("/todos/:id", async (req, res) => {
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
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const todo = await pool.query(
      "INSERT INTO todos (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.send(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// * update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    res.send(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// * delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 RETURNING *",
      [id]
    );
    res.send(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
