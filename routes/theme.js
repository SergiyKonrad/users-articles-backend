const express = require('express')
const router = express.Router()

// Route to set theme in cookies
router.post('/set-theme', (req, res) => {
  const { theme } = req.body
  if (!theme) {
    return res.status(400).send('Theme is required')
  }
  // Set the theme cookie with a 7-day expiry
  res.cookie('theme', theme, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevent client-side access to the cookie
  })
  res.send(`Theme set to ${theme}`)
})

module.exports = router
