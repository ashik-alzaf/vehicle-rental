import { Pool } from "pg";
import config from ".";
export const pool = new Pool({
  connectionString: config.connect_str,
});
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK (email =LOWER(email)),
        password TEXT NOT NULL,
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

  await pool.query(`
         CREATE TABLE IF NOT EXISTS vehicles(
         id SERIAL PRIMARY KEY,
         user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
         vehicle_name VARCHAR(100) NOT NULL,
         type TEXT,
         registration_number VARCHAR(100) UNIQUE NOT NULL,
         daily_rent_price INT NOT NULL,
         availability_status VARCHAR(30) NOT NULL,
         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()  
         )
          `);
};
export default initDB;
