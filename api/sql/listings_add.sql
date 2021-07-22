INSERT INTO listings
  (name, details, category, owner) 
VALUES
  ($1, $2, $3, $4) 
RETURNING *