import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.goals")
    .addColumn("achieved", "timestamp")
    .execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema.alterTable("goals.goals").dropColumn("achieved").execute();
};
