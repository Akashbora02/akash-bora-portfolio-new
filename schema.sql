-- ============================================================================
-- PostgreSQL Database Schema for Akash Bora Portfolio Inquiries
-- Compatible with: Vercel Postgres, Neon DB, Supabase, AWS RDS, Railway
-- ============================================================================

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

-- Optimized indexes for fast dashboard queries and status filters
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_topic ON inquiries(topic);

-- Sample test query:
-- SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 50;
