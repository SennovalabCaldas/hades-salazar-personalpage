const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const ensureAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    console.log("Token verificado exitosamente");
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "No autorizado" });
  }
};

module.exports = ensureAuthenticated;
