CREATE TRIGGER "update_password"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW EXECUTE FUNCTION encrypt_password();
