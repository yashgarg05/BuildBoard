import { Router } from 'express'
import { database } from '../config/database.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

export const ALLOWED_IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
])

export const MAX_MEDIA_SIZE = 10 * 1024 * 1024 // 10 MB

async function findUserId(firebaseUid) {
  try {
    const [rows] = await database.execute(
      'SELECT id FROM users WHERE firebase_uid = ? LIMIT 1',
      [firebaseUid],
    )
    return rows[0]?.id ?? null
  } catch {
    return null
  }
}

/**
 * Ensures media_files table exists in MySQL / TiDB
 */
export async function ensureMediaTable() {
  try {
    await database.execute(`
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
    `)
  } catch (err) {
    // Graceful fallback if tables already exist or connection initializes later
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[BuildBoard Media] Database table initialization notice:', err.message)
    }
  }
}

// Attempt table creation on initialization
ensureMediaTable().catch(() => {})

// ----------------------------------------------------------------------
// GET /api/media/:id (Serve binary image with high-performance caching)
// ----------------------------------------------------------------------
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9_-]{6,64}$/.test(id)) {
      return res.status(400).json({ error: 'Invalid media file ID.' })
    }

    const [rows] = await database.execute(
      'SELECT file_name, mime_type, file_size, file_data FROM media_files WHERE id = ? LIMIT 1',
      [id],
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Media file not found.' })
    }

    const file = rows[0]
    res.setHeader('Content-Type', file.mime_type || 'image/png')
    res.setHeader('Content-Length', file.file_size || file.file_data.length)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.end(file.file_data)
  } catch (error) {
    return next(error)
  }
})

// ----------------------------------------------------------------------
// POST /api/media (Native binary upload into TiDB with zero billing)
// ----------------------------------------------------------------------
router.post('/', requireAuth, async (req, res, next) => {
  try {
    let uploaderId = null
    if (req.authUser?.firebaseUid) {
      uploaderId = await findUserId(req.authUser.firebaseUid)
    }

    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: 'No image data uploaded.' })
    }

    if (req.body.length > MAX_MEDIA_SIZE) {
      return res.status(400).json({ error: 'Image exceeds maximum allowed size of 10MB.' })
    }

    const rawType = (req.headers['content-type'] || '').toLowerCase().split(';')[0].trim()
    const mimeType = ALLOWED_IMAGE_TYPES.has(rawType) ? rawType : 'application/octet-stream'

    if (!rawType.startsWith('image/') || !ALLOWED_IMAGE_TYPES.has(rawType)) {
      return res.status(400).json({
        error: `Unsupported image format (${rawType}). Allowed: PNG, JPG, WebP, SVG, GIF.`,
      })
    }

    let rawName = req.headers['x-file-name'] || 'prototype_media'
    try {
      rawName = decodeURIComponent(rawName)
    } catch {
      // keep raw if URI decoding fails
    }
    const sanitizedName = String(rawName).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200)

    const mediaId = `med_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    await database.execute(
      `INSERT INTO media_files (id, file_name, mime_type, file_size, file_data, uploader_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [mediaId, sanitizedName, mimeType, req.body.length, req.body, uploaderId],
    )

    const host = req.get('x-forwarded-host') || req.get('host')
    const proto = req.get('x-forwarded-proto') || req.protocol || 'https'
    const publicUrl = `${proto}://${host}/api/media/${mediaId}`

    return res.status(201).json({
      success: true,
      mediaId,
      url: publicUrl,
      name: sanitizedName,
      size: req.body.length,
      type: mimeType,
    })
  } catch (error) {
    return next(error)
  }
})

export default router
