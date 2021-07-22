UPDATE
  users
SET
  name = $1,
  first_name = $2,
  last_name = $3,
  details = $4
WHERE
  id = $5
RETURNING *