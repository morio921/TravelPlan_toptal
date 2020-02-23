const APIError = require('./api-error');

function checkRoles(roles) {
  return (req, res, next) => {
    if (roles.indexOf(req.user.role) > -1) {
      next();
      return;
    }

    throw new APIError('User is not authorized', 401);
  };
}

module.exports = {
  checkRoles,
}
