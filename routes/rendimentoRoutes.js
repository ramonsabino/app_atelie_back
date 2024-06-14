const express = require('express');
const router = express.Router();
const { getRendimentos, createRendimento } = require('../controllers/rendimentoController');

router.get('/', getRendimentos);
router.post('/', createRendimento);

module.exports = router;
