CREATE OR REPLACE FUNCTION public.password_matches2(username text, password text)
 RETURNS SETOF users
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM users
  WHERE
  users.username = username
  AND users.password = crypt(users.password, password)
$function$;
