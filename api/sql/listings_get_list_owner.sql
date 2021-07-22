SELECT * FROM listings
WHERE owner = $1
ORDER BY updated_at DESC