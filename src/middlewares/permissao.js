const jwt = require('jsonwebtoken');
const segredo = require('../config/segredo');

function permissao(req, res, next) {
  const token = req.headers.authorization;
  try {
    const payload = jwt.decode(token);

    console.log(payload);

    if (!payload.admin) {
      throw new Error('Permissão negada')
    }

    next();
  } catch (error) {
    res.status(401).json({
      mensagem: error.message,
      status: 401,
    });
  }
}

module.exports = permissao;
