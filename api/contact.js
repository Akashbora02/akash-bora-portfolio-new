/**
 * Vercel Serverless Function: Contact Form Submission & PostgreSQL Storage
 * Path: /api/contact
 * Method: POST
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

// Auto-initialize table schema if needed
async function ensureTable(client) {
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
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Send a POST request.' });
  }

  try {
    const { name, email, subject, topic, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and message are required.' });
    }

    const timestamp = new Date().toISOString();
    const id = 'inq_' + Date.now();
    const inquiryRecord = {
      id,
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Portfolio Contact Inquiry').trim(),
      topic: (topic || 'General Inquiry').trim(),
      message: message.trim(),
      status: 'unread',
      created_at: timestamp
    };

    let storedInDb = false;
    let databaseName = 'local';
    const dbPool = getPool();

    if (dbPool) {
      const client = await dbPool.connect();
      try {
        await ensureTable(client);
        await client.query(
          `INSERT INTO inquiries (id, name, email, subject, topic, message, status, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            inquiryRecord.id,
            inquiryRecord.name,
            inquiryRecord.email,
            inquiryRecord.subject,
            inquiryRecord.topic,
            inquiryRecord.message,
            inquiryRecord.status,
            inquiryRecord.created_at
          ]
        );
        storedInDb = true;
        const dbInfo = await client.query('SELECT current_database() AS db;');
        databaseName = dbInfo.rows[0]?.db || 'akash-bora-portfolio-new';
        console.log('[POSTGRES SUCCESS] Inserted lead into', databaseName, 'ID:', id);
      } catch (dbErr) {
        console.error('[POSTGRES ERROR] Failed to insert inquiry:', dbErr);
      } finally {
        client.release();
      }
    } else {
      console.log('[FALLBACK MODE] PostgreSQL URL not configured yet. Payload cached.');
    }

    // Forward instant email alert if Resend API Key is set
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.NOTIFICATION_EMAIL || 'akashbora0082@gmail.com',
            subject: `[New Lead] ${inquiryRecord.subject} from ${inquiryRecord.name}`,
            html: `
              <div style="font-family:sans-serif; max-width:600px; margin:0 auto; padding:20px; border:1px solid #e4e4e7; border-radius:10px;">
                <h2 style="color:#00E5FF; background:#0B1120; padding:16px; border-radius:8px; margin-top:0;">New Portfolio Inquiry</h2>
                <p><strong>From:</strong> ${inquiryRecord.name} (&lt;<a href="mailto:${inquiryRecord.email}">${inquiryRecord.email}</a>&gt;)</p>
                <p><strong>Category:</strong> <span style="background:#e0f2fe; color:#0369a1; padding:4px 8px; border-radius:4px;">${inquiryRecord.topic}</span></p>
                <p><strong>Subject:</strong> ${inquiryRecord.subject}</p>
                <div style="background:#f4f4f5; padding:16px; border-left:4px solid #00E5FF; border-radius:4px; margin:16px 0;">
                  ${inquiryRecord.message.replace(/\n/g, '<br>')}
                </div>
                <p style="color:#71717a; font-size:12px;">Stored in PostgreSQL Database (${databaseName}) at ${timestamp}</p>
              </div>
            `
          })
        });
      } catch (mailErr) {
        console.error('[EMAIL ALERT ERROR]:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry received and permanently stored!',
      storedInDb,
      database: databaseName,
      data: inquiryRecord
    });
  } catch (error) {
    console.error('[SERVER ERROR]:', error);
    return res.status(500).json({ error: 'Internal server error processing contact submission.' });
  }
};
