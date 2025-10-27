const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');
const { validateContactForm } = require('../middleware/validator');

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages
 * @access  Private (In production, add authentication middleware)
 */
router.get('/', getAllContacts);

/**
 * @route   GET /api/contact/:id
 * @desc    Get single contact message by ID
 * @access  Private (In production, add authentication middleware)
 */
router.get('/:id', getContactById);

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
router.post('/', validateContactForm, createContact);

/**
 * @route   PATCH /api/contact/:id/status
 * @desc    Update contact message status
 * @access  Private (In production, add authentication middleware)
 */
router.patch('/:id/status', updateContactStatus);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete contact message
 * @access  Private (In production, add authentication middleware)
 */
router.delete('/:id', deleteContact);

module.exports = router;
