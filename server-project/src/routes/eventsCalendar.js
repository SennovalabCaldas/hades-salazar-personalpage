const express = require("express");
const router = express.Router();
const calendarEventsController = require("../controllers/calendarEvents");
const authMiddleware = require("../middlewares/auth");

router.post(
  "/new-calendar-event",
  authMiddleware,
  calendarEventsController.createCalendarEvents
);

router.get("/", calendarEventsController.getCalendarEvents);

router.get("/:id", calendarEventsController.getCalendarEventsById);

router.patch(
  "/:id",
  authMiddleware,
  calendarEventsController.updateCalendarEvents
);

router.delete(
  "/:id",
  authMiddleware,
  calendarEventsController.deleteCalendarEvents
);

module.exports = router;
