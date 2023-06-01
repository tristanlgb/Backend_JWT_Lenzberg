import express from 'express';

const router = express.Router();

const publicAccess = (req, res, next) => {
  if (req.session.hasOwnProperty('user')) {
    return res.redirect('/profile');
  }
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.hasOwnProperty('user')) {
    return res.redirect('/login');
  }
  next();
};

router.get('/register', publicAccess, (req, res) => {
  res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
  res.render('login');
});

router.get('/profile', privateAccess, (req, res) => {
  const { role } = req.session.user;

  if (role === 'admin') {
    res.render('adminProfile', { user: req.session.user });
  } else {
    res.render('userProfile', { user: req.session.user });
  }
});

export default router;