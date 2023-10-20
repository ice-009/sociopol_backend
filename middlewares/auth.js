const jwt = require('jsonwebtoken');
// const httpStatus = require('http-status');

const authToken = (req, res, next) => {
  console.log(req.cookies)
  const token =
    req.headers['token'] || req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};


module.exports = {
  authToken
};
