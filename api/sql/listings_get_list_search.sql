SELECT * FROM listings
WHERE
name LIKE '%' || $1 || '%'
ORDER BY updated_at DESC