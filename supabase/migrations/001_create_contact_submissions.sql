CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  email TEXT NOT NULL,
  message TEXT,
  page TEXT,
  booking_card TEXT,
  booking_type TEXT,
  booking_hours TEXT,
  topic TEXT,
  scope TEXT,
  timeline TEXT,
  budget TEXT
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service_role can insert contact_submissions"
  ON contact_submissions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Only service_role can select contact_submissions"
  ON contact_submissions FOR SELECT
  TO service_role
  USING (true);
