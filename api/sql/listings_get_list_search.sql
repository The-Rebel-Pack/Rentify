SELECT * FROM listings
LEFT JOIN categories
ON listings.c_id = categories.c_id
WHERE
title ILIKE '%' || $1 || '%'
OR details->>'description' ILIKE '%' || $1 || '%'
ORDER BY updated_at DESC