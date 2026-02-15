import { Pool } from "pg";

import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 20, // 최대 연결 수
  queueLimit: 0,
  dateStrings: true, // 쿼리 결과를 날짜 객체 등으로 자동 변환
});

// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
//   options: `-c search_path=${process.env.DB_SCHEMA}`,
//   max: 20, // 최대 연결 수
//   idleTimeoutMillis: 30000, // 비활성 연결 대기 시간 (30초)
//   connectionTimeoutMillis: 2000, // 연결 시도 제한 시간 (2초)
// });