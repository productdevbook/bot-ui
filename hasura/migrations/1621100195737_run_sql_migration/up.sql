CREATE FUNCTION password_matches(user_row users, password text)
RETURNS SETOF users AS $$
  SELECT *
  FROM users
  WHERE
  id = user_row.id
  AND password = crypt(user_row.password, password)
$$ LANGUAGE sql STABLE;
