function checkRoles(roles) {
  return (req, res, next) => {
    if (roles.indexOf(req.user.role) > -1) {
      next();
      return;
    }

    res.status(401).json({ message: 'User is not authorized' });
  };
}

module.exports = {
  checkRoles,
}
