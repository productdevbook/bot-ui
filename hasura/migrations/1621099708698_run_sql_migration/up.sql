CREATE FUNCTION encrypt_password()
    RETURNS trigger AS $FUNC$
    BEGIN
    NEW."password" := crypt(NEW."password", gen_salt('bf'));
    RETURN NEW;
    END
    $FUNC$ LANGUAGE plpgsql;
