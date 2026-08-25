/**
 * Vercel Serverless Function: Contact Form Handler
 * Path: /api/contact
 */

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Please send a POST request.' });
  }

  try {
    const { name, email, subject, topic, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and message are mandatory.' });
    }

    const timestamp = new Date().toISOString();
    const submission = {
      id: 'inq_' + Date.now(),
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      topic: topic || 'General Inquiry',
      message,
      createdAt: timestamp,
      status: 'unread'
    };

    // Log to Vercel Function logs
    console.log('[NEW INQUIRY RECEIVED]:', JSON.stringify(submission, null, 2));

    // If Resend API Key is set in Vercel Environment Variables, send instant email
    if (process.env.RESEND_API_KEY) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.NOTIFICATION_EMAIL || 'akashbora0082@gmail.com',
            subject: `[New Inquiry] ${submission.subject} from ${submission.name}`,
            html: `
              <h2>New Portfolio Inquiry from ${submission.name}</h2>
              <p><strong>Email:</strong> ${submission.email}</p>
              <p><strong>Topic:</strong> ${submission.topic}</p>
              <p><strong>Subject:</strong> ${submission.subject}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background:#f4f4f5; padding:12px; border-left:4px solid #00E5FF;">
                ${submission.message.replace(/\n/g, '<br>')}
              </blockquote>
              <p><small>Received at: ${timestamp}</small></p>
            `
          })
        });
        console.log('[RESEND STATUS]:', emailRes.status);
      } catch (mailErr) {
        console.error('[EMAIL DISPATCH ERROR]:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry received and logged successfully!',
      data: submission
    });
  } catch (error) {
    console.error('[SERVER ERROR]:', error);
    return res.status(500).json({ error: 'Internal Server Error processing inquiry.' });
  }
};
