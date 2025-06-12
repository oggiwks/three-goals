import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.goals")
    .addColumn("due", "timestamp")
    .execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema.alterTable("goals.goals").dropColumn("due").execute();
};
