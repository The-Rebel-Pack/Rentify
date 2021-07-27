<<<<<<< HEAD
SELECT *, count(*) OVER() AS full_count 
FROM listings
INNER JOIN categories 
ON listings.c_id = categories.c_id
INNER JOIN users 
ON listings.u_id = users.u_id
=======
SELECT *
FROM listings
NATURAL JOIN categories
NATURAL JOIN users
>>>>>>> master
WHERE listings.l_id = $1