SELECT *, count(*) OVER() AS full_count 
FROM listings l
LEFT JOIN categories c
ON l.c_id = c.c_id
WHERE l.c_id = $2
ORDER BY updated_at DESC
LIMIT 5
OFFSET ($1 - 1) * 5