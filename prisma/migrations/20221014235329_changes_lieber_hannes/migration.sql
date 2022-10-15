-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE "instructions_id_seq";
ALTER TABLE "Instructions" ALTER COLUMN "id" SET DEFAULT nextval('instructions_id_seq');
ALTER SEQUENCE "instructions_id_seq" OWNED BY "Instructions"."id";
