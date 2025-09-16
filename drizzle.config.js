import { connection } from "next/server";

    export default {
        schema: "./utils/schema.jsx",
        dialect: "postgresql",
        dbCredentials: {
           url: "postgresql://neondb_owner:npg_1bDIGAUKvz9L@ep-curly-unit-a165n8zi-pooler.ap-southeast-1.aws.neon.tech/expense_db?sslmode=require&channel_binding=require"
        }
    };