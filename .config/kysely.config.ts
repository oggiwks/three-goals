import { defineConfig } from "kysely-ctl";
import { dialect } from "../src/lib/db/db";

export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: "src/lib/db/migrations",
  },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
