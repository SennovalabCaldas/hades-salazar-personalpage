const pool = require("../db");
const fs = require("fs/promises");

const createServiceCategories = async (req, res) => {
  try {
    console.log('estoy en create');
    const { category_name, active = true } = req.body;
    console.log(req.body);

    if (!category_name) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool
      .promise()
      .query("INSERT INTO categoryServices (category_name, active) VALUES (?, ?)", [
        category_name,
        active,
      ]);

    res
      .status(201)
      .json({ message: "Categoría de servicio creada correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getServiceCategories = async (req, res) => {
  try {
    const result = await pool.promise().query("SELECT * FROM categoryServices");
    const rows = result[0];
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateStateServiceCategories = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await pool
      .promise()
      .query("UPDATE categoryServices SET active = ? WHERE id = ?", [
        active,
        id,
      ]);
    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateServiceCategories = async (req, res) => {
  const { id } = req.params;
  const { category_name, active } = req.body;

  try {
    await pool
      .promise()
      .query(
        "UPDATE categoryServices SET category_name = ?,active = ? WHERE id = ?",
        [category_name, active, id]
      );

    res.status(200).json({ message: "Slide actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteServiceCategories = async (req, res) => {
  try {
    const { id } = req.params;

    await pool
      .promise()
      .query("DELETE FROM categoryServices WHERE id = ?", [id]);

    res.status(200).json({ message: "Slide eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getServiceCategoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool
      .promise()
      .query("SELECT * FROM categoryServices WHERE id = ?", [id]);

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
  createServiceCategories,
  getServiceCategories,
  updateStateServiceCategories,
  updateServiceCategories,
  deleteServiceCategories,
  getServiceCategoriesById,
};
