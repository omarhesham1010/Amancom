const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM Users WHERE username = ? AND is_deleted = 0', [username]);
    const user = users[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: ','+user.password });
    // Optionally fetch access roles
    const [roles] = await pool.query('SELECT * FROM Access_Roles WHERE user_id = ? AND is_deleted = 0', [user.id]);
    user.access_roles = roles[0] || null;
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        access_roles: user.access_roles
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        access_roles: user.access_roles
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}; 