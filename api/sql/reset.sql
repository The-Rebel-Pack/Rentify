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
  u_id VARCHAR(120) PRIMARY KEY,
  email VARCHAR(120) NOT NULL UNIQUE,
  full_name VARCHAR(120) NOT NULL,
  first_name VARCHAR(120),
  last_name VARCHAR(120),
  u_details JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  c_id SERIAL PRIMARY KEY,
  category VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS listings (
  l_id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  details JSON NOT NULL,
  price JSON NOT NULL,
  c_id INTEGER,
  FOREIGN KEY (c_id) REFERENCES categories (c_id),
  u_id VARCHAR(120),
  FOREIGN KEY (u_id) REFERENCES users (u_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON listings
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO
  categories (category)
VALUES
  ('vehicles'),
  ('furniture'),
  ('clothes'),
  ('electronics'),
  ('home'),
  ('sport'),
  ('tools & machines'),
  ('party'),
  ('boats');

INSERT INTO
  users (u_id, full_name, email, first_name, last_name, u_details)
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
  ),
  (
    'ryfC4JSl5sPkmAWOvtq2D4cw3PA2',
    'Jenny Svensson',
    'jenny.svensson@appliedtechnology.se',
    'Jenny',
    'Svensson',
    '{"phone": "123-456789"}'
  ),
  (
    'Aazr4yslBGVV6rSF4aZPmgpxvlq1',
    'Elias Helander',
    'elias.helander@appliedtechnology.se',
    'Elias',
    'Helander',
    '{"phone": "123-456789"}'
  );

INSERT INTO
  listings (title, details, price, c_id, u_id)
VALUES
  (
    'Keyboard',
    '{"description": "Can type very fast", "images": ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2900&q=80"], "location": "Stockholm, Sweden"}',
    '{"day": 100}',
    4,
    'Aazr4yslBGVV6rSF4aZPmgpxvlq1'
  ),
  (
    'Typing thing',
    '{"description": "Can type very fast", "images": ["https://images.unsplash.com/photo-1526459181387-e472f440e31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"], "location": "Lund, Skåne, Sweden"}',
    '{"day": 100}',
    7,
    '1'
  ),
  (
    'Fancy car',
    '{"description": "Very fancy car", "images": ["https://images.unsplash.com/photo-1535732820275-9ffd998cac22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"], "location": "Malmö, Skåne, Sweden"}',
    '{"day": 200}',
    1,
    '3'
  ),
  (
    'Floaty boat',
    '{"description": "Very floaty boat", "images": ["https://images.unsplash.com/photo-1545566239-0b2fb5c50bc6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"], "location": "Stockholm, Sweden"}',
    '{"day": 500}',
    9,
    '3'
  ),
  (
    'Fancy Batman costume',
    '{"description": "Best costume for your Batman fantasies", "images": ["https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"], "location": "Lund, Skåne, Sweden"}',
    '{"day": 150}',
    3,
    'Aazr4yslBGVV6rSF4aZPmgpxvlq1'
  ),
  (
    'Sup',
    '{"description": "Sporty floaty SUP.", "images": ["https://images.unsplash.com/photo-1517176118179-65244903d13c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80", "https://images.unsplash.com/photo-1615910588337-8e018ce1ee55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"], "location": "Malmö, Skåne, Sweden"}',
    '{"day": 120}',
    6,
    'Aazr4yslBGVV6rSF4aZPmgpxvlq1'
  ),
  (
    'Nice home in the woods',
    '{"description": "Very nice cabin", "images": ["https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"]}',
    '{"day": 300}',
    5,
    '2'
  ),
  (
    'Sony Walkman',
    '{"description": "Very nice Sony Walkman freestyle", "images": ["https://images.unsplash.com/photo-1611001716885-b3402558a62b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"]}',
    '{"day": 30}',
    4,
    'ryfC4JSl5sPkmAWOvtq2D4cw3PA2'
  ),
  (
    'Fast car',
    '{"description": "Very fast car", "images": ["https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1778&q=80"]}',
    '{"day": 100}',
    1,
    '1'
  ),
  (
    'Sauna boat',
    '{"description": "Very floaty sauna", "images": ["https://a0.muscache.com/im/pictures/01306991-ed44-4b34-8c2a-9f25ae5d38a3.jpg?im_w=1200", "https://a0.muscache.com/im/pictures/733c4c9f-1074-468a-b835-0bca721815dc.jpg?im_w=1440", "https://a0.muscache.com/im/pictures/511c7c39-6706-4aca-af1b-dd09a45c851b.jpg?im_w=1440"]}',
    '{"day": 1000, "3day": 2000}',
    5,
    '1'
  ),
  (
    'Wooden chair',
    '{"description": "Very nice chair", "images": ["https://images.unsplash.com/photo-1562113530-57ba467cea38?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhaXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"]}',
    '{"day": 300}',
    2,
    '2'
  );
