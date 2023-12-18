const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

const createAccessToken = (user) => {
  const expToken = new Date();
  expToken.setMinutes(expToken.getMinutes() + 15);
  const payload = {
    token_type: "access",
    user_id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  console.log(payload);
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const createRefreshToken = (user) => {
  console.log(user);
  const expToken = new Date();
  expToken.setDate(expToken.getDate() + 30);
  const payload = {
    token_type: "refresh",
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decoded = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

const verifyAccessToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    console.log("Token verificado exitosamente");
    console.log("Contenido del payload:", payload);

    return payload; // Puedes devolver el contenido del payload si es necesario
  } catch (error) {
    // El token es inválido
    console.error("Error al verificar el token:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }

};

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
  verifyAccessToken,
};
