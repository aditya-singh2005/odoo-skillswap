// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db, { connectDB } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Test DB route
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ DB Query Error:', err.message);
    res.status(500).json({ error: 'Database error' });
  }
});


// Fetch all swap requests with sender and receiver user info
// Fetch all swap requests for a specific receiver
app.get('/api/requests/:receiverId', async (req, res) => {
  const { receiverId } = req.params;

  // Validate receiverId is a number
  if (isNaN(receiverId)) {
    return res.status(400).json({ 
      error: 'Invalid receiver ID',
      details: 'Receiver ID must be a number'
    });
  }

  console.log(`Fetching requests for receiver: ${receiverId}`); // Debug log

  try {
    const query = `
      SELECT 
        sr.id,
        sr.sender_id,
        sr.receiver_id,
        sr.skill_offered,
        sr.skill_requested,
        sr.status,
        sr.created_at,
        u.name AS sender_name,
        u.location AS sender_location,
        u.profile_photo AS sender_profile_photo,
        u.email AS sender_email
      FROM swap_requests sr
      JOIN users u ON sr.sender_id = u.id
      WHERE sr.receiver_id = $1
      ORDER BY sr.created_at DESC;
    `;

    const { rows } = await db.query(query, [receiverId]);

    console.log(`Found ${rows.length} requests for receiver ${receiverId}`); // Debug log

    if (rows.length === 0) {
      return res.status(404).json({ 
        message: 'No requests found for this user',
        receiverId
      });
    }

    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      details: err.message,
      query: 'SELECT swap_requests with user details'
    });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
