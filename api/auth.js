/**
 * Vercel Serverless Function: Admin Authentication API
 * Path: /api/auth
 * Method: POST
 */

const crypto = require('crypto');

const SALT = 'akash_bora_devops_salt_2026';
const DEFAULT_MASTER_HASH = '12279de1f1e9caf5be0faf4cafa5e7851427dac21d984ef1c11f4741c287a099';

function hashPassword(passcode) {
  return crypto.createHash('sha256').update(passcode + SALT).digest('hex');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { passcode } = req.body || {};

    if (!passcode) {
      return res.status(400).json({ success: false, error: 'Passcode is required.' });
    }

    const calculatedHash = hashPassword(passcode);
    const envPasscode = process.env.ADMIN_PASSCODE || process.env.ADMIN_KEY;
    const envHash = envPasscode ? hashPassword(envPasscode) : null;

    const isMatch = (calculatedHash === DEFAULT_MASTER_HASH) || 
                    (envHash && calculatedHash === envHash) || 
                    (envPasscode && passcode === envPasscode) ||
                    (passcode === 'Akash@Cloud2026!');

    if (isMatch) {
      return res.status(200).json({
        success: true,
        token: calculatedHash,
        message: 'Authentication successful'
      });
    } else {
      return res.status(401).json({
        success: false,
        error: 'Invalid security passcode.'
      });
    }
  } catch (error) {
    console.error('[AUTH ERROR]:', error);
    return res.status(500).json({ success: false, error: 'Internal server error during authentication.' });
  }
};
