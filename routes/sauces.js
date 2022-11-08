const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const like = require('../controllers/like');

router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/',auth, multer, saucesCtrl.createSauces);
router.get('/:id',auth,  saucesCtrl.getOneSauces);
router.put('/:id',auth, multer,  saucesCtrl.modifySauces);
router.delete('/:id',auth,  saucesCtrl.deleteSauces);
router.post('/:id/like', auth, like.likeSauces);


module.exports = router;