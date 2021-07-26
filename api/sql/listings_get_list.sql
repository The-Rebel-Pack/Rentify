SELECT * FROM listings
INNER JOIN categories 
ON listings.category_id = categories.id
ORDER BY updated_at DESC
LIMIT 5
OFFSET ($1 - 1) * 5