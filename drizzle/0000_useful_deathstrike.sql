CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"customer" boolean DEFAULT true NOT NULL,
	"profile_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"avatar_url" text,
	"name" text NOT NULL,
	"birth_date" timestamp with time zone,
	"phone" text NOT NULL,
	"gender" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" text PRIMARY KEY NOT NULL,
	"street" text NOT NULL,
	"neighborhood" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"number" integer,
	"cep" text,
	"lat" double precision NOT NULL,
	"long" double precision NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"logo_url" text,
	"description" text,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"establishment_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_addresses" (
	"id" text PRIMARY KEY NOT NULL,
	"street" text NOT NULL,
	"neighborhood" text NOT NULL,
	"state" text NOT NULL,
	"city" text NOT NULL,
	"number" integer,
	"cep" text,
	"lat" double precision NOT NULL,
	"long" double precision NOT NULL,
	"establishment_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_services" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" numeric NOT NULL,
	"time" numeric NOT NULL,
	"image_url" text,
	"description" text,
	"establishment_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"rating" numeric NOT NULL,
	"name_user" text,
	"message" text,
	"anonymous" boolean,
	"establishment_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_specialists" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"establishment_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_specialist_services" (
	"id" text PRIMARY KEY NOT NULL,
	"establishment_specialist_id" text NOT NULL,
	"establishment_service_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" text PRIMARY KEY NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"status" boolean NOT NULL,
	"user_id" text NOT NULL,
	"establishment_specialists_id" text NOT NULL,
	"establishment_services_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "recovery_codes" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "establishment_specialist_permissions" (
	"id" text PRIMARY KEY NOT NULL,
	"establishment_specialist_id" text NOT NULL,
	"permission_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_categories" ADD CONSTRAINT "establishment_categories_establishment_id_establishment_id_fk" FOREIGN KEY ("establishment_id") REFERENCES "public"."establishment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_addresses" ADD CONSTRAINT "establishment_addresses_establishment_id_establishment_id_fk" FOREIGN KEY ("establishment_id") REFERENCES "public"."establishment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_services" ADD CONSTRAINT "establishment_services_establishment_id_establishment_id_fk" FOREIGN KEY ("establishment_id") REFERENCES "public"."establishment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_reviews" ADD CONSTRAINT "establishment_reviews_establishment_id_establishment_id_fk" FOREIGN KEY ("establishment_id") REFERENCES "public"."establishment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_specialists" ADD CONSTRAINT "establishment_specialists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_specialists" ADD CONSTRAINT "establishment_specialists_establishment_id_establishment_id_fk" FOREIGN KEY ("establishment_id") REFERENCES "public"."establishment"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_specialist_services" ADD CONSTRAINT "establishment_specialist_services_establishment_specialist_id_establishment_specialists_id_fk" FOREIGN KEY ("establishment_specialist_id") REFERENCES "public"."establishment_specialists"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_specialist_services" ADD CONSTRAINT "establishment_specialist_services_establishment_service_id_establishment_services_id_fk" FOREIGN KEY ("establishment_service_id") REFERENCES "public"."establishment_services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_establishment_specialists_id_establishment_specialists_id_fk" FOREIGN KEY ("establishment_specialists_id") REFERENCES "public"."establishment_specialists"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_establishment_services_id_establishment_services_id_fk" FOREIGN KEY ("establishment_services_id") REFERENCES "public"."establishment_services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recovery_codes" ADD CONSTRAINT "recovery_codes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_specialist_permissions" ADD CONSTRAINT "establishment_specialist_permissions_establishment_specialist_id_establishment_specialists_id_fk" FOREIGN KEY ("establishment_specialist_id") REFERENCES "public"."establishment_specialists"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishment_specialist_permissions" ADD CONSTRAINT "establishment_specialist_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE set null ON UPDATE no action;