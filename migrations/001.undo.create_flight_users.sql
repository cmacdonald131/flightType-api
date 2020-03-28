ALTER TABLE flight_users
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS flight_users;