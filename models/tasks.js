module.exports = db => {
  const all = () =>
    new Promise((resolve, reject) => {
      db.query("SELECT * FROM tasks ORDER BY id;")
        .then(res => {
          resolve(res.rows);
        })
        .catch(err => reject(err));
    });

  // const all = () => db.query("SELECT * FROM tasks;").then(res => res.rows);

  const create = task =>
    new Promise((resolve, reject) => {
      const query = "INSERT INTO tasks (title) VALUES ($1) RETURNING *;";
      const values = [task.title];
      db.query(query, values)
        .then(res => {
          console.log(res);
          resolve(res.rows);
        })
        .catch(err => reject(err));
    });

  const get = id =>
    new Promise((resolve, reject) => {
      const query = "SELECT * FROM tasks WHERE id = $1 LIMIT 1";
      const values = [id];

      db.query(query, values)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err));
    });

  const update = (id, task) =>
    new Promise((resolve, reject) => {
      const query = "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3";
      const values = [task.title, task.completed, id];

      db.query(query, values)
        .then(res => resolve())
        .catch(err => reject(err));
    });

  const deleteTask = id =>
    new Promise((resolve, reject) => {
      const query = "DELETE FROM tasks WHERE id = $1";
      const values = [id];

      db.query(query, values)
        .then(res => resolve())
        .catch(err => reject(err));
    });

  return {
    all,
    create,
    get,
    update,
    delete: deleteTask
  };
};
