INSERT INTO listings
  (c_id, title, details, price, u_id) 
VALUES
  ($1, $2, $3, $4, $5) 
RETURNING *