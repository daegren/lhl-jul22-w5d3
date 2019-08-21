DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL
);


INSERT INTO tasks (title) VALUES ('Do Something');
INSERT INTO tasks (title) VALUES ('Do Something Else');
