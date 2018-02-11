const config = require('../../config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) return res.status(403).json({code: 403, message: 'no token provided'});

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) return res.status(401).json({code: 401, message: 'authentication failed'});

    req.decoded = decoded;
    next();
  });
};

module.exports = authMiddleware;
