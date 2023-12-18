const { log } = require("console");
const pool = require("../db");
const fs = require("fs/promises");

const createService = async (req, res) => {
  console.log('Entre a crear servicio');
  try {
    const {
      service_name,
      service_description,
      service_price,
      active = true,
      category_id,
    } = req.body;
    const service_image = req.file.path;

    console.log(service_image);

    const result = await pool
      .promise()
      .query(
        "INSERT INTO services (service_name, service_description, service_image, service_price, active, category_id) VALUES (?, ?, ?, ?, ?, ?)",
        [
          service_name,
          service_description,
          service_image,
          service_price,
          active,
          category_id,
        ]
      );

    res.status(201).json({ message: "Servicio creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getServices = async (req, res) => {
  try {
    const result = await pool.promise().query("SELECT * FROM services");
    const rows = result[0];
    res.status(200).json({ data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getServicesById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool
      .promise()
      .query("SELECT * FROM services WHERE id = ?", [id]);
    const rows = result[0];
    res.status(200).json({ data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateStateService = async (req, res) => {
  const { id } = req.params;
  const { active } = req.body;

  try {
    await pool
      .promise()
      .query("UPDATE services SET active = ? WHERE id = ?", [active, id]);
    res.status(200).json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const {
    service_name,
    service_description,
    service_price,
    active = true,
    category_id,
  } = req.body;

  try {
    const result = await pool
      .promise()
      .query("SELECT service_image FROM services WHERE id = ?", [id]);

    const imagePath = result[0][0].service_image;

    if (req.file) {
      await fs.unlink(imagePath);
    }

    const service_image = req.file ? req.file.path : imagePath;

    await pool

      .promise()

      .query(
        "UPDATE services SET service_name = ?, service_description = ?, service_image = ?, service_price = ?, active = ?, category_id = ? WHERE id = ?",

        [
          service_name,
          service_description,
          service_image,
          service_price,
          active,
          category_id,
          id,
        ]
      );

    res.status(200).json({ message: "Servicio actualizado correctamente" });
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal Server Error");
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool
      .promise()
      .query("SELECT service_image FROM services WHERE id = ?", [id]);

    const imagePath = result[0][0].service_image;

    await pool.promise().query("DELETE FROM services WHERE id = ?", [id]);
    await fs.unlink(imagePath);

    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createService,
  getServices,
  getServicesById,
  updateStateService,
  updateService,
  deleteService,
};
