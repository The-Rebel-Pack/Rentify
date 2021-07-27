SELECT *
FROM listings
NATURAL JOIN categories
NATURAL JOIN users
WHERE listings.l_id = $1