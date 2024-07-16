const jwt = require('jsonwebtoken');
const segredo = require('../config/segredo');

function autorizacao(req, res, next) {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, segredo);
    next();
  } catch (error) {
    if (error.message === 'jwt must be provided') {
      res.status(401).json({
        mensagem: 'É necessário um Token.',
        status: 401,
      });
    } else if (error.message === 'jwt malformed') {
      res.status(401).json({
        mensagem: 'Token mau formatado.',
        status: 401,
      });
    } else if (error.message === 'jwt expired') {
      res.status(401).json({
        mensagem: 'Token expirado.',
        status: 401,
      });
    } else if (error.message === 'invalid token' || error.message === 'invalid signature') {
      res.status(401).json({
        mensagem: 'Token inválido.',
        status: 401,
      });
    }
  }
}

module.exports = autorizacao;
