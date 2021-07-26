INSERT INTO users
  (u_id, full_name, first_name, last_name, email, u_details) 
VALUES
  ($1, $2, $3, $4, $5, $6)
RETURNING *