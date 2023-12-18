const pool = require("../db");
const jwt = require("../utils/jwt");

const login = async (req, res) => {
  try {
    const { email, current_password } = req.body;

    if (!email || !current_password) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool
      .promise()
      .query("SELECT * FROM users WHERE email = ? AND current_password = ?", [
        email,
        current_password,
      ]);

    const rows = result[0];

    if (rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Credenciales incorrectas o usuario inactivo" });
    }

    res.status(200).json({
      access: jwt.createAccessToken(rows[0]),
      refresh: jwt.createRefreshToken(rows[0]),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      current_password,
      active,
      phone_number,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !current_password ||
      active === undefined ||
      !phone_number
    ) {
      return res.status(400).json({ message: "Datos incompletos o inválidos" });
    }

    const result = await pool
      .promise()
      .query(
        "INSERT INTO users (first_name, last_name,email, current_password,active, phone_number) VALUES (?, ?, ?,?, ?, ?)",
        [first_name, last_name, email, current_password, active, phone_number]
      );

    const rows = result[0];

    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
  res.send("logout");
};

const getMe = async (req, res) => {
  try {
    console.log("getMe");
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Token de autorización no proporcionado" });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verifyAccessToken(accessToken);
    console.log(decodedToken);

    if (!decodedToken) {
      return res.status(401).json({ message: "Token de acceso inválido" });
    }

    const userId = decodedToken.user_id;
    console.log(userId);
    const result = await pool.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
    const rows = result[0];
    console.log(rows[0]);
    res.status(200).json({ message: "Información del usuario", data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  login,
  register,
  logout,
  getMe,
};
