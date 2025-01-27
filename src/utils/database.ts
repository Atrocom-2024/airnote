import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  options: `-c search_path=${process.env.DB_SCHEMA}`,
  max: 20, // 최대 연결 수
  idleTimeoutMillis: 30000, // 비활성 연결 대기 시간 (30초)
  connectionTimeoutMillis: 2000, // 연결 시도 제한 시간 (2초)
});