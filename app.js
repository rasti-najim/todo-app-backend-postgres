const express = require("express");
const cors = require("cors");

// custom imports
const auth = require("./routes/auth");
const users = require("./routes/users");
const todos = require("./routes/todos");

const app = express();

app.use(cors({ exposedHeaders: ["auth-token"] }));
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/todos", todos);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
