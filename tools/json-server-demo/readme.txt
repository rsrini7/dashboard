json-server --watch db.json --port 3100 --middlewares ./header.js
// header.js
module.exports = (req, res, next) => {
  res.header('Content-Type', 'application/vnd.api+json')
  next()
}