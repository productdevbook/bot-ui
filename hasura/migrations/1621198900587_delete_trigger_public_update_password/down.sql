CREATE TRIGGER "update_password"
AFTER UPDATE ON "public"."users"
FOR EACH ROW EXECUTE FUNCTION encrypt_password();
