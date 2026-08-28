/**
 * Vercel Serverless Function: PostgreSQL Database Diagnostic & Connection Health Check
 * Path: /api/db-status
 * Method: GET, POST
 */

const { Pool } = require('pg');

let pool;
function getPool() {
  if (!pool) {
    const connectionString = 
      process.env.POSTGRES_URL || 
      process.env.DATABASE_URL || 
      process.env.POSTGRES_URL_NON_POOLING || 
      process.env.POSTGRES_PRISMA_URL;

    if (connectionString) {
      pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
      });
    } else if (process.env.PGHOST && process.env.PGUSER) {
      pool = new Pool({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE || 'akash-bora-portfolio-new',
        port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
        ssl: { rejectUnauthorized: false }
      });
    }
  }
  return pool;
}

// Master SHA-256 hash authorization
const MASTER_HASH = '12279de1f1e9caf5be0faf4cafa5e7851427dac21d984ef1c11f4741c287a099';

function isAuthorized(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace('Bearer ', '').trim();
  return token === MASTER_HASH || token === process.env.ADMIN_TOKEN || token === 'akash_admin_auth_token';
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const dbPool = getPool();
  const envDetected = process.env.POSTGRES_URL ? 'POSTGRES_URL' : 
                      process.env.DATABASE_URL ? 'DATABASE_URL' : 
                      process.env.POSTGRES_URL_NON_POOLING ? 'POSTGRES_URL_NON_POOLING' : 
                      process.env.PGHOST ? 'PGHOST_VARIABLES' : 'NONE';

  if (!dbPool) {
    return res.status(200).json({
      connected: false,
      status: 'pending_configuration',
      message: 'No PostgreSQL connection string detected in Vercel environment variables.',
      envDetected: 'NONE',
      instructions: {
        step1: 'Go to your Vercel Dashboard -> Storage tab',
        step2: 'Click Connect Project -> select akash-bora-portfolio-new',
        step3: 'Or add environment variable POSTGRES_URL in Project Settings -> Environment Variables',
        step4: 'Trigger a new Deployment to apply environment variables'
      }
    });
  }

  const startTime = Date.now();

  try {
    const client = await dbPool.connect();
    try {
      // Create table if not exists
      await client.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id VARCHAR(64) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255),
          topic VARCHAR(255),
          message TEXT NOT NULL,
          status VARCHAR(32) DEFAULT 'unread',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      const countRes = await client.query('SELECT COUNT(*) AS total FROM inquiries;');
      const dbInfoRes = await client.query('SELECT current_database() AS db, current_user AS user, version() AS version;');
      const latencyMs = Date.now() - startTime;

      return res.status(200).json({
        connected: true,
        status: 'live',
        database: dbInfoRes.rows[0]?.db || 'akash-bora-portfolio-new',
        user: dbInfoRes.rows[0]?.user,
        totalInquiries: parseInt(countRes.rows[0]?.total || '0', 10),
        latencyMs,
        envDetected,
        version: dbInfoRes.rows[0]?.version?.split(' ')[0] + ' ' + dbInfoRes.rows[0]?.version?.split(' ')[1]
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('[POSTGRES DIAGNOSTIC ERROR]:', err);
    return res.status(200).json({
      connected: false,
      status: 'connection_error',
      error: err.message,
      envDetected,
      latencyMs: Date.now() - startTime
    });
  }
};
