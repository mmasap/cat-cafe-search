SELECT *
FROM "Cat"
WHERE EXTRACT(MONTH FROM "birthDate") = EXTRACT(MONTH FROM CURRENT_DATE)
ORDER BY EXTRACT(DAY FROM "birthDate")