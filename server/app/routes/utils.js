var ensureAuth = function (req, res, next) {
  if (req.isAuthenicated()) {
    next();
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  ensureAuth: ensureAuth
}