import express from 'express';
import userModel from '../models/User.model';
import express from 'express';
import userModel from '../models/User.model';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import jwt from 'jsonwebtoken';

const router = express.Router();
passport.use(
  new GitHubStrategy(
    {
      clientID: 'your-github-client-id',
      clientSecret: 'your-github-client-secret',
      callbackURL: 'http://your-app-domain/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create the user based on the GitHub profile
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Create a new user if it doesn't exist
          const newUser = new userModel({
            first_name: profile.displayName,
            email: profile.emails[0].value,
            password: '', // GitHub login doesn't require a password
            role: 'user',
          });

          user = await newUser.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
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

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    const user = await userModel.register(new userModel({
      first_name,
      last_name,
      email,
      age,
      role: 'user',
    }), password);

    res.send({ status: 'success', message: 'User registered' });
  } catch (error) {
    res.status(400).send({ status: 'error', error: error.message });
  }
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const { email, role } = req.user;

 const token = jwt.sign({ email, role }, 'your-secret-key');

  res.send({ status: 'success', payload: { token }, message: 'Login successful' });
});


router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send({ status: "error", error: "Failed to logout" });
    res.redirect('/login');
  });
});

export default router;
