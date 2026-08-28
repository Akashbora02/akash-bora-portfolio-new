/**
 * Vercel Serverless Function: Admin Inquiries Management API
 * Path: /api/messages
 * Methods: GET, PATCH, DELETE
 */

const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING;
    if (connectionString) {
      pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
      });
    }
  }
  return pool;
}

// Master SHA-256 hash
const MASTER_HASH = '12279de1f1e9caf5be0faf4cafa5e7851427dac21d984ef1c11f4741c287a099';

function isAuthorized(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace('Bearer ', '').trim();
  // Allow if token matches master hash or admin secret
  return token === MASTER_HASH || token === process.env.ADMIN_TOKEN || token === 'akash_admin_auth_token';
}

module.exports = async (req, res) => {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify authentication
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized access. Master passcode verification required.' });
  }

  const dbPool = getPool();

  // GET: Fetch all inquiries
  if (req.method === 'GET') {
    if (!dbPool) {
      return res.status(200).json({
        success: true,
        source: 'local-fallback',
        messages: []
      });
    }

    try {
      const client = await dbPool.connect();
      try {
        const result = await client.query(`
          SELECT id, name, email, subject, topic, message, status, created_at AS "createdAt"
          FROM inquiries
          ORDER BY created_at DESC
          LIMIT 200;
        `);
        return res.status(200).json({
          success: true,
          source: 'postgresql',
          messages: result.rows
        });
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('[POSTGRES FETCH ERROR]:', err);
      return res.status(500).json({ error: 'Failed to fetch inquiries from PostgreSQL.' });
    }
  }

  // PATCH: Update inquiry status (mark as read/replied)
  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    if (!id || !status) {
      return res.status(400).json({ error: 'Missing id or status.' });
    }

    if (!dbPool) {
      return res.status(200).json({ success: true, source: 'local-fallback' });
    }

    try {
      const client = await dbPool.connect();
      try {
        await client.query('UPDATE inquiries SET status = $1 WHERE id = $2', [status, id]);
        return res.status(200).json({ success: true, message: 'Status updated in PostgreSQL.' });
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('[POSTGRES UPDATE ERROR]:', err);
      return res.status(500).json({ error: 'Failed to update inquiry in database.' });
    }
  }

  // DELETE: Delete an inquiry
  if (req.method === 'DELETE') {
    const { id, clearAll } = req.query || req.body || {};

    if (!dbPool) {
      return res.status(200).json({ success: true, source: 'local-fallback' });
    }

    try {
      const client = await dbPool.connect();
      try {
        if (clearAll === 'true') {
          await client.query('DELETE FROM inquiries');
          return res.status(200).json({ success: true, message: 'All inquiries cleared from PostgreSQL.' });
        } else if (id) {
          await client.query('DELETE FROM inquiries WHERE id = $1', [id]);
          return res.status(200).json({ success: true, message: 'Inquiry deleted from PostgreSQL.' });
        } else {
          return res.status(400).json({ error: 'Missing inquiry ID.' });
        }
      } finally {
        client.release();
      }
    } catch (err) {
      console.error('[POSTGRES DELETE ERROR]:', err);
      return res.status(500).json({ error: 'Failed to delete inquiry from database.' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed.' });
};
