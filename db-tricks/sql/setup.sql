DROP TABLE IF EXISTS listings, users, categories;

CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL,
    name VARCHAR(120) NOT NULL,
    first_name VARCHAR(120),
    last_name VARCHAR(120)
);

CREATE TABLE IF NOT EXISTS categories
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS listings
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    details JSON NOT NULL,
    category INTEGER, 
    FOREIGN KEY (category) REFERENCES categories (id),
    owner INTEGER, 
    FOREIGN KEY (owner) REFERENCES users (id)
);

INSERT INTO categories
  (name)
VALUES
  ('vehicles'),
  ('furniture');

INSERT INTO users
  (name, email, first_name, last_name)
VALUES
  ('Anna Nilsson', 'anna@nilsson.se', 'Anna', 'Nilsson'),
  ('Bo Karlsson', 'bo@karlsson.se', 'Bo', 'Karlsson'),
  ('Robert Olsson', 'robert@olsson.se', 'Robert', 'Olsson');

INSERT INTO listings
  (name, details, category, owner)
VALUES
  ('Fast car', '{"description": "Very fast car", "images": ["https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"]}', 1, 1),
  ('Fancy car', '{"description": "Very fancy car", "images": ["https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"]}', 2, 3),
  ('Old chair', '{"description": "Very nice chair", "images": ["https://images.unsplash.com/photo-1562113530-57ba467cea38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhaXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]}', 2, 2);
