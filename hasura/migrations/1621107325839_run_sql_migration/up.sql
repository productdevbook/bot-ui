CREATE OR REPLACE FUNCTION public.encrypt_password()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
    BEGIN
    NEW."password" := crypt(NEW."password", gen_salt('bf', 8));
    RETURN NEW;
    END
    $function$;
