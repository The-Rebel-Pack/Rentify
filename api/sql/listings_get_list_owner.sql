SELECT * FROM listings
WHERE u_id = $1
ORDER BY updated_at DESC