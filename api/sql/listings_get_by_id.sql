SELECT *, count(*) OVER() AS full_count 
FROM listings
INNER JOIN categories 
ON listings.c_id = categories.c_id
INNER JOIN users 
ON listings.u_id = users.u_id
WHERE listings.l_id = $1