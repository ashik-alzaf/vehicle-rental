import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const bookingResult = await pool.query(
    `
    INSERT INTO bookings (
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price
    )
    SELECT
      $1,
      $2,
      $3,
      $4,
      ($4::date - $3::date) * daily_rent_price
    FROM vehicles
    WHERE id = $2
    RETURNING *;
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date]
  );

  const booking = bookingResult.rows[0];

  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  booking.vehicle = vehicleResult.rows[0];

  return booking;
};

const getBooking = async () => {
  const bookingResult = await pool.query(`SELECT * FROM bookings`);
  const booking = bookingResult.rows[0];
  const userResult = await pool.query(`SELECT name,email FROM users`);
  booking.customer = userResult.rows[0];
  const vehicleResult = await pool.query(
    `SELECT vehicle_name,registration_number FROM vehicles`
  );
  booking.vehicle = vehicleResult.rows[0];
  return booking;
};

const updateBooking = async (status: string, id: string) => {
  console.log(status, id);
  const updateQuery = await pool.query(
    `
  UPDATE bookings
  SET status=$1,
  WHERE id=$2
  RETURNING *
  `,
    [status, id]
  );

  const booking = updateQuery.rows[0];
  if (status === "returned") {
    const updateVehicle = await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING availability_status `,[booking.vehicle_id]
    );
    booking.vehicle = updateVehicle.rows[0];
  }
  return updateQuery;
};
export const bookingServices = {
  createBooking,
  getBooking,
  updateBooking,
};
