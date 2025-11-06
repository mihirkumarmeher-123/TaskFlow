import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const MIG = path.join(process.cwd(), 'migrations', '001_taskflow_schema.sql');
const sql = fs.readFileSync(MIG, 'utf8');
(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      multipleStatements: true
    });
    await conn.query(sql);
    await conn.end();
    console.log('Migrations executed');
  } catch (err) { console.error(err); process.exit(1); }
})();
