UPDATE
  users
SET
  full_name = $1,
  first_name = $2,
  last_name = $3,
  details = $4
WHERE
  u_id = $5
RETURNING *