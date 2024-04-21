"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite = require("sqlite3");
// For error stack traces - in prod comment down the line
sqlite.verbose();
// Loads the filebased db or runs in memory if not available
var dbname = process.env.DATABASE_PATH;
console.log(dbname);
var db = new sqlite.Database(dbname, function (err) {
    if (err)
        return err.message;
    console.log("Successfully connected to the database!");
});
