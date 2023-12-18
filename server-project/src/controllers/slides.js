const pool = require("../db");
const fs = require("fs/promises");

const createSlide = async (req, res) => {
  try {
    const { slide_title, slide_description, active = true } = req.body;
    const slide_image = req.file.path;

    if (!slide_title || !slide_description || !slide_image) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool
      .promise()
      .query(
        "INSERT INTO slides (slide_title, slide_description, slide_image, active) VALUES (?, ?, ?, ?)",
        [slide_title, slide_description, slide_image, active]
      );

    res.status(201).json({ message: "Slide creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getSlides = async (req, res) => {
  try {
    const result = await pool.promise().query("SELECT * FROM slides");
    const rows = result[0];
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateStateSlide = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await pool
      .promise()
      .query("UPDATE slides SET active = ? WHERE id = ?", [active, id]);
    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateSlide = async (req, res) => {
  const { id } = req.params;
  const { slide_title, slide_description, active = true } = req.body;

  try {
    const result = await pool
      .promise()
      .query("SELECT slide_image FROM slides WHERE id = ?", [id]);

    const imagePath = result[0][0].slide_image;

    if (req.file) {
      await fs.unlink(imagePath);
    }

    const slide_image = req.file ? req.file.path : imagePath;

    await pool
      .promise()
      .query(
        "UPDATE slides SET slide_title = ?, slide_description = ?, slide_image = ?, active = ? WHERE id = ?",
        [slide_title, slide_description, slide_image, active, id]
      );

    res.status(200).json({ message: "Slide actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteSlide = async (req, res) => {

  try {
    const { id } = req.params;
    const result = await pool
      .promise()
      .query("SELECT slide_image FROM slides WHERE id = ?", [id]);

    const imagePath = result[0][0].slide_image;

    await pool.promise().query("DELETE FROM slides WHERE id = ?", [id]);
    await fs.unlink(imagePath);

    res.status(200).json({ message: "Slide eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool
      .promise()
      .query("SELECT * FROM slides WHERE id = ?", [id]);

    const rows = result[0];

    if (rows.length === 0) {
      return res.status(404).json({ message: "Slide no encontrado" });
    }

    res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createSlide,
  getSlides,
  updateSlide,
  deleteSlide,
  updateStateSlide,
  getSlide,
};
