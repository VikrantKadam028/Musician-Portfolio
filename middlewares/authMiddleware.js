// File: middlewares/authMiddleware.js
exports.isLoggedIn = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/admin-harsh-login');
  };
  