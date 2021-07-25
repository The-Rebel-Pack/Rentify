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
  id VARCHAR(120) PRIMARY KEY,
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
  owner VARCHAR(120),
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
  users (id, name, email, first_name, last_name, details)
VALUES
  (
    '1',
    'Anna Nilsson',
    'anna@nilsson.se',
    'Anna',
    'Nilsson',
    '{"phone": "123-456789"}'
  ),
  (
    '2',
    'Bo Karlsson',
    'bo@karlsson.se',
    'Bo',
    'Karlsson',
    '{"phone": "123-456789"}'
  ),
  (
    '3',
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
    '1'
  ),
  (
    'Fancy car',
    '{"description": "Very fancy car", "images": ["https://images.unsplash.com/photo-1535732820275-9ffd998cac22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"]}',
    '{"day": 200}',
    2,
    '3'
  ),
  (
    'Fancy boat',
    '{"description": "Very fancy boat", "images": ["https://images.unsplash.com/photo-1545566239-0b2fb5c50bc6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]}',
    '{"day": 500}',
    2,
    '3'
  ),
  (
    'Fancy Batman costume',
    '{"description": "Best costume for your Batman fantasies", "images": ["https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"]}',
    '{"day": 150}',
    3,
    '3'
  ),
  (
    'Old chair',
    '{"description": "Very nice chair", "images": ["https://images.unsplash.com/photo-1562113530-57ba467cea38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhaXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]}',
    '{"day": 300}',
    2,
    '2'
  );