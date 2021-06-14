const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(5000, () => {
  console.log("Listening on port 5000...");
});
