import dotenv from "dotenv";
dotenv.config();

console.log(process.env);

export const PORT = process.env.PORT || 8080;
export const domain = process.env.DOMAIN || "http://localhost";

//DATOS DE DB
export const HOST = process.env.HOSTNAME || "localhost";
export const USER = process.env.DB_USER || "karinahnatova";
export const PASS = process.env.DB_PASS || "Greo6789";
export const DBNAME = process.env.DATA_BASE || "project";

export const fullDomain = `${domain}:${PORT}`;
