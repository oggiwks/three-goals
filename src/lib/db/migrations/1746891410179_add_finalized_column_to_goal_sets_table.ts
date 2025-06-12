import type { Kysely } from "kysely";

export const up = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.goal_sets")
    .addColumn("finalized", "timestamp")
    .execute();
};

export const down = async (db: Kysely<unknown>): Promise<void> => {
  await db.schema
    .alterTable("goals.goal_sets")
    .dropColumn("finalized")
    .execute();
};
