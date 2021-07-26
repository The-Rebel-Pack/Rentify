SELECT * FROM listings
WHERE
title ILIKE '%' || $1 || '%'
OR details->>'description' ILIKE '%' || $1 || '%'
ORDER BY updated_at DESC