INSERT INTO users
  (id, name, first_name, last_name, email, details) 
VALUES
  ($1, $2, $3, $4, $5, $6)
RETURNING *