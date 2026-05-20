-- Remove insecure anon INSERT policies
DROP POLICY IF EXISTS "Anyone can insert purchases" ON purchases;
DROP POLICY IF EXISTS "Anyone can insert user_access" ON user_access;

-- Only service_role can insert (webhook backend)
CREATE POLICY "Service role can insert purchases"
  ON purchases FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can insert user_access"
  ON user_access FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Authenticated users (admin) can still select
CREATE POLICY "Authenticated can select purchases"
  ON purchases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can select user_access"
  ON user_access FOR SELECT
  TO authenticated
  USING (true);
