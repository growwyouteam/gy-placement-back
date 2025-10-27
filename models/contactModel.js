const Contact = require('./schemas/contactSchema');

/**
 * Contact Model - MongoDB implementation
 */
class ContactModel {
  /**
   * Get all contact messages
   * @returns {Promise<Array>} Array of contact messages
   */
  static async getAllContacts() {
    return await Contact.find().sort({ createdAt: -1 });
  }

  /**
   * Get contact by ID
   * @param {String} id - Contact ID
   * @returns {Promise<Object|null>} Contact object or null
   */
  static async getContactById(id) {
    return await Contact.findById(id);
  }

  /**
   * Create new contact message
   * @param {Object} contactData - Contact data
   * @returns {Promise<Object>} Created contact
   */
  static async createContact(contactData) {
    const contact = new Contact(contactData);
    return await contact.save();
  }

  /**
   * Update contact status
   * @param {String} id - Contact ID
   * @param {String} status - New status (read/unread/replied)
   * @returns {Promise<Object|null>} Updated contact or null
   */
  static async updateContactStatus(id, status) {
    return await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }

  /**
   * Delete contact message
   * @param {String} id - Contact ID
   * @returns {Promise<Boolean>} Success status
   */
  static async deleteContact(id) {
    const result = await Contact.findByIdAndDelete(id);
    return result !== null;
  }
}

module.exports = ContactModel;
