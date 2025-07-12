import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const pg = neon(process.env.DATABASE_URL);
// drizzle expects just the neon client here
export const db = drizzle(pg);
