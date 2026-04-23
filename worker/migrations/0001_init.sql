CREATE TABLE submissions (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  service      TEXT,
  message      TEXT,
  utm_source   TEXT,
  utm_medium   TEXT,
  utm_campaign TEXT,
  ip           TEXT,
  user_agent   TEXT
);
