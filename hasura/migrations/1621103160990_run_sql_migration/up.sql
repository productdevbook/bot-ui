CREATE OR REPLACE FUNCTION password_matches(username text, password text)
RETURNS SETOF users AS $$
  SELECT *
  FROM users
  WHERE
  users.username = username
  AND users.password = crypt(users.password, password)
$$ LANGUAGE sql STABLE;
