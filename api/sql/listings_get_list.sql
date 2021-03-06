SELECT *, count(*) OVER() AS full_count 
FROM listings
LEFT JOIN categories
ON listings.c_id = categories.c_id
ORDER BY updated_at DESC
LIMIT 6
OFFSET ($1 - 1) * 6