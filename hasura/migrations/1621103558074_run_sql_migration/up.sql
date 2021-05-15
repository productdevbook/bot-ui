CREATE OR REPLACE FUNCTION public.password_matches2(user_row users, pwd text)
 RETURNS SETOF users
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM users
  WHERE
  username = user_row.username
  AND password = crypt(user_row.password, pwd)
$function$;
