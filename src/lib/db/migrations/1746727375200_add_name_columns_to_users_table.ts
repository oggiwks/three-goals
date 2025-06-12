import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.users")
    .addColumn("first_name", "varchar(255)", (col) => col.notNull())
    .addColumn("last_name", "varchar(255)", (col) => col.notNull())
    .execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.users")
    .dropColumn("first_name")
    .dropColumn("last_name")
    .execute();
};
