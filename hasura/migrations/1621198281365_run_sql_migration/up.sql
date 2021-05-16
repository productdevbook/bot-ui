CREATE TRIGGER users
               BEFORE INSERT
               ON public.users
               FOR EACH ROW
               EXECUTE PROCEDURE public.encrypt_password();
