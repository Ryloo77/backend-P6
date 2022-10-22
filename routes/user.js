const express = require('express');
const router = express.Router();
//const userCtrl =  require('../controllers/user');

const User = require('../models/User');
router.post('/signup', (req, res, next) => {
    const user = new User({
      ...req.body
    });
    user.save()
    .then(() => res.status(201).json({message:'user enregistré !'}))
    .catch(error => res.status(400).json({ error }))
  });


//router.post('/signup', userCtrl.signup),
//router.post('/login', userCtrl.login)

module.exports = router;