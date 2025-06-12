import { Kysely, sql } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .createTable("goals.users")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("username", "varchar(255)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp")
    .execute();

  await db.schema
    .createTable("goals.goal_sets")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp")
    .addColumn("user_id", "uuid", (col) =>
      col.references("goals.users.id").onDelete("cascade"),
    )
    .execute();

  await db.schema
    .createTable("goals.goals")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("title", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`))
    .addColumn("deleted_at", "timestamp")
    .addColumn("goal_set_id", "uuid", (col) =>
      col.references("goals.goal_sets.id").onDelete("cascade"),
    )
    .execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema.dropTable("goals.goals").execute();
  await db.schema.dropTable("goals.goal_sets").execute();
  await db.schema.dropTable("goals.users").execute();
};
