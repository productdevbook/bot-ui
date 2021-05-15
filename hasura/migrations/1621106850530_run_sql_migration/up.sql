CREATE OR REPLACE FUNCTION public.password_matches(user_row users, pwd text)
 RETURNS SETOF users
 LANGUAGE sql
 STABLE
AS $function$
  SELECT *
  FROM users
  WHERE
  password = crypt(pwd, user_row.password)
$function$;
