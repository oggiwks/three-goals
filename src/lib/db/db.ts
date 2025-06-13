import { Kysely, ParseJSONResultsPlugin, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "@/lib/db/types";

export const dialect = new PostgresDialect({
  pool: new Pool({
    database: "three_goals",
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new ParseJSONResultsPlugin()],
});
