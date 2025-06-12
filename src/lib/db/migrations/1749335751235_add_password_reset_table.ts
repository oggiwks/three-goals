import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .createTable("goals.password_reset")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("user_id", "uuid", (col) =>
      col.references("goals.users.id").onDelete("cascade"),
    )
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires_at", "timestamp", (col) => col.notNull())
    .execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema.dropTable("goals.password_reset").execute();
};
