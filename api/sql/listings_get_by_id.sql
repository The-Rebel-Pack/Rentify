SELECT * FROM listings 
INNER JOIN categories 
ON listings.category_id = categories.id
INNER JOIN users 
ON listings.owner_id = users.id
WHERE listings.id = $1