SELECT *, count(*) OVER() AS full_count 
FROM listings l
LEFT JOIN categories c
ON l.c_id = c.c_id
WHERE l.u_id = $1
ORDER BY updated_at DESC