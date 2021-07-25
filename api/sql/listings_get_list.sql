SELECT * FROM listings
ORDER BY updated_at DESC
LIMIT 5
OFFSET ($1 - 1) * 5