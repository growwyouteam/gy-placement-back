const User = require('./schemas/userSchema');

/**
 * User Model - MongoDB implementation
 */
class UserModel {
  /**
   * Create new user (Sign up)
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  static async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Find user by email
   * @param {String} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  static async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase(), isActive: true });
  }

  /**
   * Find user by username
   * @param {String} username - Username
   * @returns {Promise<Object|null>} User object or null
   */
  static async findByUsername(username) {
    return await User.findOne({ username, isActive: true });
  }

  /**
   * Find user by ID
   * @param {String} id - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  static async findById(id) {
    return await User.findOne({ _id: id, isActive: true });
  }

  /**
   * Update user
   * @param {String} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} Updated user or null
   */
  static async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
  }

  /**
   * Update last login time
   * @param {String} id - User ID
   * @returns {Promise<Object|null>} Updated user or null
   */
  static async updateLastLogin(id) {
    return await User.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    );
  }

  /**
   * Delete user (soft delete)
   * @param {String} id - User ID
   * @returns {Promise<Boolean>} Success status
   */
  static async deleteUser(id) {
    const result = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return result !== null;
  }

  /**
   * Get all users (admin only)
   * @returns {Promise<Array>} Array of users
   */
  static async getAllUsers() {
    return await User.find({ isActive: true }).select('-password');
  }
}

module.exports = UserModel;
