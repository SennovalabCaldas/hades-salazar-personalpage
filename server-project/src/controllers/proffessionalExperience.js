const { log } = require("console");
const pool = require("../db");
const fs = require("fs/promises");

const createAcademicExperience = async (req, res) => {
  try {
    const {
      academic_name,
      academic_description,
      year_start,
      year_end,
      active = true,
    } = req.body;
    const academic_image = req.file.path;

    if (
      !academic_name ||
      !academic_description ||
      !academic_image ||
      !year_start ||
      !year_end
    ) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool
      .promise()
      .query(
        "INSERT INTO professionalExperience (academic_name, academic_description, academic_image, year_start, year_end, active) VALUES (?, ?, ?, ?,?,?)",
        [
          academic_name,
          academic_description,
          academic_image,
          year_start,
          year_end,
          active,
        ]
      );

    res
      .status(201)
      .json({ message: "Experiencia académica creada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAcademicExperiences = async (req, res) => {
  try {
    const result = await pool
      .promise()
      .query("SELECT * FROM professionalExperience");
    const rows = result[0];
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAcademicExperienceById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool
      .promise()
      .query("SELECT * FROM professionalExperience WHERE id = ?", [id]);

    const rows = result[0];

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Experiencia académica no existe" });
    }

    res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateAcademicExperience = async (req, res) => {
  const { id } = req.params;
  const { academic_name, academic_description, year_start, year_end, active } =
    req.body;

  try {
    const result = await pool
      .promise()
      .query("SELECT academic_image FROM professionalExperience WHERE id = ?", [
        id,
      ]);

    console.log(result[0][0].academic_image);
    const imagePath = result[0][0].academic_image;

    if (req.file) {
      await fs.unlink(imagePath);
    }

    const academic_image = req.file ? req.file.path : imagePath;

    await pool
      .promise()
      .query(
        "UPDATE professionalExperience SET academic_name = ?, academic_description = ?, year_start = ?,year_end = ?, academic_image = ?, active = ? WHERE id = ?",
        [
          academic_name,
          academic_description,
          year_start,
          year_end,
          academic_image,
          active,
          id,
        ]
      );

    res.status(200).json({ message: "Slide actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteAcademicExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool
      .promise()
      .query("SELECT academic_image FROM professionalExperience WHERE id = ?", [
        id,
      ]);

    const imagePath = result[0][0].academic_image;

    await pool
      .promise()
      .query("DELETE FROM professionalExperience WHERE id = ?", [id]);
    await fs.unlink(imagePath);

    res.status(200).json({ message: "Slide eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateStateAcademicExperience = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await pool
      .promise()
      .query("UPDATE professionalExperience SET active = ? WHERE id = ?", [
        active,
        id,
      ]);
    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createAcademicExperience,
  getAcademicExperiences,
  updateAcademicExperience,
  deleteAcademicExperience,
  getAcademicExperienceById,
  updateStateAcademicExperience,
};
