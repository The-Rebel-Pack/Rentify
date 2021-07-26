UPDATE
  listings
SET
  c_id = $1,
  title = $2,
  details = $3,
  price = $4,
  u_id = $5
WHERE
  l_id = $6
RETURNING *