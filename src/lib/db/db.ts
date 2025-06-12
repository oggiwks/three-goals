import { Kysely, ParseJSONResultsPlugin, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "@/lib/db/types";

export const dialect = new PostgresDialect({
  pool: new Pool({
    database: "three_goals",
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT ?? "5432"),
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
  plugins: [new ParseJSONResultsPlugin()],
});
