const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "w5d3_lecture",
  port: 5432
});

client
  .connect()
  .then(() => client.query("SELECT * FROM tasks ORDER BY id;"))
  .then(res => {
    console.log(res.rows);

    client.end();
  })
  .catch(err => {
    console.log("There was an error connecting to the database", err);

    client.end();
  });
