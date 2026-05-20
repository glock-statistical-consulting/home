CREATE TABLE feedback_requests (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  purchase_id BIGINT REFERENCES purchases(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  product_name TEXT,
  token UUID DEFAULT gen_random_uuid() NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','sent','completed')),
  sent_at TIMESTAMPTZ,
  UNIQUE(token)
);

CREATE TABLE feedback_responses (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  request_id BIGINT REFERENCES feedback_requests(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  anonymous BOOLEAN DEFAULT true,
  visible BOOLEAN DEFAULT false
);

ALTER TABLE feedback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feedback_responses"
  ON feedback_responses FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can select visible feedback_responses"
  ON feedback_responses FOR SELECT
  TO anon
  USING (visible = true);

CREATE POLICY "Authenticated can select all feedback_requests"
  ON feedback_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update feedback_requests"
  ON feedback_requests FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can select all feedback_responses"
  ON feedback_responses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update feedback_responses"
  ON feedback_responses FOR UPDATE
  TO authenticated
  USING (true);
