import { createClient } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as schema from "~/server/db/schema";

/**
 * Cache the database connection in development. 
 * This avoids creating a new connection
 * on every Hot-Module-Replacement update.
 */

const globalForDb = globalThis as unknown as { db: LibSQLDatabase<typeof schema> | undefined};

const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_DATABASE_AUTH_TOKEN,
});

export const db = globalForDb.db ?? drizzle(turso, { schema });

if (env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

