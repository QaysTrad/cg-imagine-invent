
exports.createSession = function (req, res, newUser) {
    req.session.regenerate(function () {
    req.session.user = newUser
    res.sendStatus(201) 
  })
}
exports.isLoggedIn = function (req, res) {
  if (req.session) {
    return !!req.session.user
  }
  return false
}

exports.checkUser = (req, res, next) => {
  if (!exports.isLoggedIn(req)) {
    res.sendStatus(404)
  } else {
    next()
  }
}