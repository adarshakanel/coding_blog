const { Pool } = require("pg");

const pool = new Pool({
    user: "userchallenge@vt-code-challenge",
    password: "userchallenge",
    host: "vt-code-challenge.postgres.database.azure.com",
    port: "5432",
    database: "challenge",
    ssl: true
});

module.exports = pool;