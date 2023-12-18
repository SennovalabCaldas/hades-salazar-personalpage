const pool = require("../db");

const createCalendarEvents = async (req, res) => {
  try {
    console.log("estoy en create");
    const { title, start, end } = req.body;
    console.log(req.body);

    if ((!title, !start, !end)) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool
      .promise()
      .query("INSERT INTO eventsCalendar (title, start, end) VALUES (?, ?, ?)", [
        title,
        start,
        end,
      ]);

    res
      .status(201)
      .json({ message: "Evento de calendario creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCalendarEvents = async (req, res) => {
  try {
    const result = await pool.promise().query("SELECT * FROM eventsCalendar");
    const rows = result[0];
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getCalendarEventsById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool
      .promise()
      .query("SELECT * FROM eventsCalendar WHERE id = ?", [id]);
    const rows = result[0];

    if (!rows.length) {
      return res
        .status(404)
        .json({ message: "Evento de calendario no encontrado" });
    }

    res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateCalendarEvents = async (req, res) => {
  const { id } = req.params;
  const { title, start, end } = req.body;

  try {
    const result = await pool
      .promise()
      .query("SELECT * FROM eventsCalendar WHERE id = ?", [id]);
    const rows = result[0];

    if (!rows.length) {
      return res
        .status(404)
        .json({ message: "Evento de calendario no encontrado" });
    }

    await pool
      .promise()
      .query(
        "UPDATE eventsCalendar SET title = ?, start = ?, end = ? WHERE id = ?",
        [title, start, end, id]
      );

    res
      .status(200)
      .json({ message: "Evento de calendario actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteCalendarEvents = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.promise().query("DELETE FROM eventsCalendar WHERE id = ?", [id]);

    res
      .status(200)
      .json({ message: "Evento de calendario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCalendarEvents,
  getCalendarEvents,
  updateCalendarEvents,
  deleteCalendarEvents,
  getCalendarEventsById,
};
