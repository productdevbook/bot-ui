CREATE OR REPLACE FUNCTION public.password_matches(user_row users, pwd text)
 RETURNS SETOF users
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM users
  WHERE
  username = user_row.username AND
  password = crypt(pwd, user_row.password)
$function$;
