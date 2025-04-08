const authenticate = {
  isRegistered(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  },
};

export default authenticate;
