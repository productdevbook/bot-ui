CREATE TRIGGER "update_password"
AFTER UPDATE ON "public"."users"
FOR EACH ROW
WHEN (OLD.password IS DISTINCT FROM NEW.password) 
EXECUTE FUNCTION encrypt_password();
