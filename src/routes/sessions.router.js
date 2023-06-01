import express from 'express';
import userModel from '../models/User.model';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const exist = await userModel.findOne({ email });
  if (exist) {
    return res.status(400).send({ status: "error", error: "User already exists" });
  }

  const user = {
    first_name,
    last_name,
    email,
    age,
    role,
    password
  };

  const result = await userModel.create(user);
  res.send({ status: "success", message: "User registered" });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res.status(400).send({ status: "error", error: "Incorrect credentials" });
  }

  if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123') {
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
            role: 'admin'
    };
  } else {
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: 'user'
    };
  }

  res.send({ status: "success", payload: req.session.user, message: "Login successful" });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ status: "error", error: "Failed to logout" });
    res.redirect('/login');
  });
});

export default router;
