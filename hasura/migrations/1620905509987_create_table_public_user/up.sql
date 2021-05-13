CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."user"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "username" text NOT NULL, "password" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "last_seen" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("username"));
