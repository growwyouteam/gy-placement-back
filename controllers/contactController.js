const ContactModel = require('../models/contactModel');

/**
 * Get all contact messages
 * @route GET /api/contact
 */
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.getAllContacts();
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single contact by ID
 * @route GET /api/contact/:id
 */
const getContactById = async (req, res, next) => {
  try {
    const contact = await ContactModel.getContactById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new contact message
 * @route POST /api/contact
 */
const createContact = async (req, res, next) => {
  try {
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      subject: req.body.subject,
      message: req.body.message
    };
    
    const contact = await ContactModel.createContact(contactData);
    
    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully. We will get back to you soon!',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update contact status
 * @route PATCH /api/contact/:id/status
 */
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const validStatuses = ['unread', 'read', 'replied'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }
    
    const contact = await ContactModel.updateContactStatus(req.params.id, status);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete contact message
 * @route DELETE /api/contact/:id
 */
const deleteContact = async (req, res, next) => {
  try {
    const success = await ContactModel.deleteContact(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContactStatus,
  deleteContact
};
