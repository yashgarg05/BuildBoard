USE buildboard;

-- ----------------------------------------------------------------------
-- Milestone 10: Native Database Media Storage (Zero-Billing Image Uploads)
-- ----------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS media_files (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INT UNSIGNED NOT NULL,
  file_data MEDIUMBLOB NOT NULL,
  uploader_id BIGINT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_media_uploader (uploader_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
