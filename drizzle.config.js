import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // ✅ Load from .env.local (optional)

export default {
    schema: './config/schema.js', // ✅ Adjust if needed
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};
