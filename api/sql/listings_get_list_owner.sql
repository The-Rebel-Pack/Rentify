SELECT * FROM listings
WHERE owner_id = $1
ORDER BY updated_at DESC