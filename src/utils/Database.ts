import { Database } from "sqlite3";
const sqlite = require("sqlite3");


// For error stack traces - in prod comment down the line
sqlite.verbose();

// Loads the filebased db or runs in memory if not available
const dbname: string = process.env.DATABASE_PATH || ":memory:";
console.log(dbname);

const db:Database  = new sqlite.Database(dbname, (err: Error | null) => {
    if(err) return err.message;
    console.log("Successfully connected to the database!");
});

export default db;

