const express = require('express');
//on créer un router avec la methode router d'express
const router = express.Router();
const userCtrl = require('../controllers/user');

//création de la logique de route
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//on export le router vers notre app
module.exports = router;