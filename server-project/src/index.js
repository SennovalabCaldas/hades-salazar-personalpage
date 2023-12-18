const express = require("express");
const app = express();
const cors = require("cors");

app.listen(3100, () => console.log("Server running on port 3000"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

app.use(express.static("uploads"));

app.use(cors());

const authRoute = require("./routes/auth");
const slidesRoute = require("./routes/slides");
const academicExperiencesRoute = require("./routes/academicExperience");
const proffessionalExperiencesRoute = require("./routes/proffessionalExperience");
const serviceCategoriesRoute = require("./routes/serviceCategories");
const servicesRoute = require("./routes/services");
const calendarEventsRoute = require("./routes/eventsCalendar");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/slides", slidesRoute);
app.use("/api/v1/academic-experiences", academicExperiencesRoute);
app.use("/api/v1/proffessional-experiences", proffessionalExperiencesRoute);
app.use("/api/v1/service-categories", serviceCategoriesRoute);
app.use("/api/v1/services", servicesRoute);
app.use("/api/v1/calendar-events", calendarEventsRoute);


