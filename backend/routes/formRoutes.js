const express = require('express');
const { createForm, getFormById, submitResponse } = require('../controllers/formController');
const router = express.Router();

// Route to create a new form
router.post('/', createForm);

// Route to fetch a form by ID
router.get('/:id', getFormById);

// Route to submit responses to a form
router.post('/:id/responses', submitResponse);

module.exports = router;
