// on import express pour créer le router
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
//on créer un router avec la methode router d'express
const router = express.Router();

// on importe les contrôleurs relatifs aux sauces
const saucesCtrl = require('../controllers/sauces');
const like = require('../controllers/like');

// on créer la logique de routing (CRUD) qui fait appelle à chaques logique metiers du "controller"
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/',auth, multer, saucesCtrl.createSauces);
router.get('/:id',auth,  saucesCtrl.getOneSauces);
router.put('/:id',auth, multer,  saucesCtrl.modifySauces);
router.delete('/:id',auth,  saucesCtrl.deleteSauces);
router.post('/:id/like', auth, like.likeSauces);


module.exports = router;