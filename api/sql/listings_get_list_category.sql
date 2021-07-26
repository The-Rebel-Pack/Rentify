SELECT * FROM listings
WHERE c_id = $2
ORDER BY updated_at DESC
LIMIT 5
OFFSET ($1 - 1) * 5