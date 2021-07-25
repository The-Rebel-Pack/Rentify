INSERT INTO listings
  (category, name, details, price, owner) 
VALUES
  ($1, $2, $3, $4, $5) 
RETURNING *