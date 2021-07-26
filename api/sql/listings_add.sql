INSERT INTO listings
  (category, title, details, price, owner_id) 
VALUES
  ($1, $2, $3, $4, $5) 
RETURNING *