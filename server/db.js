require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",       
  password: process.env.POSTGRES_PASSWORD || "AdamBach662005", 
  host: process.env.POSTGRES_HOST || "database",     
  database: process.env.POSTGRES_DB || "perntodo",     
  port: process.env.POSTGRES_PORT || 5432,                
});

module.exports = pool;
