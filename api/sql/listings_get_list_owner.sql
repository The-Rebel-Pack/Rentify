SELECT *, count(*) OVER() AS full_count 
FROM listings
WHERE u_id = $1
ORDER BY updated_at DESC