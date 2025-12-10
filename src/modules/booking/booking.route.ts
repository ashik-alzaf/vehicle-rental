import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();
router.post("/", auth(), bookingControllers.createController);
router.get("/", auth(), bookingControllers.getBooking);
router.put("/:bookingId", auth(), bookingControllers.updateBooking);
export const bookingRoutes = router;
