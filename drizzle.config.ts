import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_DATABASE_AUTH_TOKEN,
  },
  // tablesFilter: ["m_*"],
} satisfies Config;
