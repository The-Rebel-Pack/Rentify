DROP TABLE IF EXISTS listings,
users,
categories;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(120) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  first_name VARCHAR(120),
  last_name VARCHAR(120),
  details JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  details JSON NOT NULL,
  price JSON NOT NULL,
  category INTEGER,
  FOREIGN KEY (category) REFERENCES categories (id),
  owner INTEGER,
  FOREIGN KEY (owner) REFERENCES users (id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON listings
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO
  categories (name)
VALUES
  ('vehicles'),
  ('furniture'),
  ('clothes'),
  ('electronics');

INSERT INTO
  users (name, email, first_name, last_name, details)
VALUES
  (
    'Anna Nilsson',
    'anna@nilsson.se',
    'Anna',
    'Nilsson',
    '{"phone": "123-456789"}'
  ),
  (
    'Bo Karlsson',
    'bo@karlsson.se',
    'Bo',
    'Karlsson',
    '{"phone": "123-456789"}'
  ),
  (
    'Robert Olsson',
    'robert@olsson.se',
    'Robert',
    'Olsson',
    '{"phone": "123-456789"}'
  );

INSERT INTO
  listings (name, details, price, category, owner)
VALUES
  (
    'Fast car',
    '{"description": "Very fast car", "images": ["https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"]}',
    '{"day": 100}',
    1,
    1
  ),
  (
    'Fancy car',
    '{"description": "Very fancy car", "images": ["https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"]}',
    '{"day": 200}',
    2,
    3
  ),
  (
    'Old chair',
    '{"description": "Very nice chair", "images": ["https://images.unsplash.com/photo-1562113530-57ba467cea38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhaXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]}',
    '{"day": 300}',
    2,
    2
  );