import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
    schema: './config/schema.js',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
};
