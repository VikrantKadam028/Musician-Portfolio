// File: controllers/authController.js
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    req.session.userId = user._id;
    return res.redirect('/admin/dashboard');
  }
  res.render('login', { error: 'Invalid credentials' });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
