const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // heroku addon
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

// const pool = new Pool({
//   user: "postgres",
//   password: "*3EyDeeKYso^^GQs!XuSsqjf#UCHPP",
//   host: "localhost",
//   port: 5432,
//   database: "todo_app",
// });

module.exports = pool;
