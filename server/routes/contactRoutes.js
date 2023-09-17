const express = require('express');

const {
  getAllContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require('../controller/contactController');

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getSingleContact);
router.post('/', createContact);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
