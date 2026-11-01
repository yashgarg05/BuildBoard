import { Router } from 'express'
import { database } from '../config/database.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

router.post('/me', requireAuth, async (req, res, next) => {
  try {
    const { firebaseUid, email, emailVerified } = req.authUser
    await database.execute(
      `INSERT INTO users (firebase_uid, email, email_verified)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE email = VALUES(email), email_verified = VALUES(email_verified)`,
      [firebaseUid, email, emailVerified],
    )

    const [rows] = await database.execute(
      'SELECT id, firebase_uid, email, email_verified, created_at FROM users WHERE firebase_uid = ? LIMIT 1',
      [firebaseUid],
    )

    return res.json({ user: rows[0] })
  } catch (error) {
    return next(error)
  }
})

export default router
