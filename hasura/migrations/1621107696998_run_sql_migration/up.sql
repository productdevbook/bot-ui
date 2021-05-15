CREATE OR REPLACE FUNCTION public.password_matches(user_row users, pwd text)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
SELECT EXISTS (
  SELECT *
  FROM users
  WHERE
  username = user_row.username AND
  password = crypt(pwd, user_row.password)
  )
$function$;
