const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const db = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "w5d3_lecture",
  port: 5432
});

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

db.connect().then(() => {
  const Tasks = require("./models/tasks")(db);

  // Home page
  app.get("/", (req, res) => {
    Tasks.all().then(tasks => {
      res.render("index", { tasks });
    });
  });

  // CREATE tasks
  app.post("/tasks", (req, res) => {
    if (!req.body.title) {
      res.redirect("/");
      return;
    }

    Tasks.create({ title: req.body.title })
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        console.log("Got an error trying to insert a new task", err);
        res.redirect("/");
      });
  });

  // SHOW task
  app.get("/tasks/:id", (req, res) => {
    Tasks.get(req.params.id)
      .then(task => {
        res.render("show", { task });
      })
      .catch(err => {
        console.log("Got an error trying to insert a new task", err);
        res.redirect("/");
      });
  });

  // DELETE task
  app.post("/tasks/:id/delete", (req, res) => {
    Tasks.delete(req.params.id)
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        console.log("Got an error deleting task", err);
        res.redirect(`/tasks/${req.params.id}`);
      });
  });

  // UPDATE task
  app.post("/tasks/:id", (req, res) => {
    if (!req.body.title) {
      res.redirect(`/tasks/${req.params.id}`);
      return;
    }

    Tasks.update(req.params.id, {
      title: req.body.title,
      completed: req.body.completed ? true : false
    })
      .then(() => {
        res.redirect(`/tasks/${req.params.id}`);
      })
      .catch(err => {
        console.log("Got an error updating task", err);
        res.redirect(`/tasks/${req.params.id}`);
      });
  });

  app.listen(8080);
  console.log("Server running on http://localhost:8080/");
});
