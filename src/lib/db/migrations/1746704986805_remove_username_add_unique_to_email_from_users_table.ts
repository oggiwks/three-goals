import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.users")
    .addUniqueConstraint("email_unique", ["email"])
    .execute();

  await db.schema.alterTable("goals.users").dropColumn("username").execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.users")
    .dropConstraint("email_unique")
    .execute();

  await db.schema
    .alterTable("goals.users")
    .addColumn("username", "varchar(255)", (col) => col.notNull())
    .execute();
};
