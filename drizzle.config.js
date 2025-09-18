import { connection } from "next/server";
import 'dotenv/config';

    export default {
        schema: "./utils/schema.jsx",
        dialect: "postgresql",
        dbCredentials: {
           url: process.env.NEXT_PUBLIC_DATABASE_URL, 
        }
    };