SELECT * FROM listings
WHERE category = $1
ORDER BY updated_at DESC