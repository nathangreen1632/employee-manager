import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const connectToDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database.');
    await client.query('SELECT NOW()');
    client.release();
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};


export { pool, connectToDb };
