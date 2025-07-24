const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  async findByUsername(username) {
    const [users] = await pool.query('SELECT * FROM Users WHERE username = ? AND is_deleted = 0', [username]);
    const user = users[0];
    if (!user) return null;
    // Fetch access roles
    const [roles] = await pool.query('SELECT * FROM Access_Roles WHERE user_id = ? AND is_deleted = 0', [user.id]);
    user.access_roles = roles[0] || null;
    return user;
  },

  async create({ name, username, password, role }) {
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO Users (name, username, password, role, is_deleted) VALUES (?, ?, ?, ?, 0)',
      [name, username, hash, role]
    );
    return { id: result.insertId, name, username, role };
  },

  async validatePassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
};

module.exports = User; 