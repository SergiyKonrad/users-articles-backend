const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const router = express.Router()

// Secret key for JWT
const SECRET_KEY = 'your_secret_key'

// Temporary in-memory database for users
const usersDB = []

// Middleware for parsing cookies
router.use(cookieParser())

// Content Security Policy middleware (specific to auth routes)
router.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self' http://localhost:8000",
  )
  next()
})

// Registration route
router.post('/register', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).send('Username and password are required')
  }
  const existingUser = usersDB.find((u) => u.username === username)
  if (existingUser) {
    return res.status(400).send('User already exists')
  }
  // Store plaintext password (not secure, but for demonstration purposes)
  usersDB.push({ username, password })
  res.send('User registered successfully')
})

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = usersDB.find(
    (u) => u.username === username && u.password === password,
  )
  if (!user) {
    return res.status(401).send('Invalid credentials')
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
  res.cookie('authToken', token, {
    httpOnly: true, // Ensures the cookie is not accessible via client-side scripts
    // httpOnly: false, // Allow client-side access (for development only)
    secure: false, // Use true in production with HTTPS
    sameSite: 'Lax', // Ensure the cookie works across same-origin requests
    path: '/', // Ensure the cookie is available for all routes
  })
  res.send('Login successful')
})

// Middleware to protect routes
const authenticate = (req, res, next) => {
  const token = req.cookies.authToken
  if (!token) {
    // console.log('No authToken cookie found') // Debug missing token
    return res.status(401).send('Unauthorized')
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY)
    req.user = payload
    next()
  } catch (err) {
    res.status(403).send('Invalid token')
  }
}

// Protected route.
router.get('/protected', authenticate, (req, res) => {
  if (!req.cookies.authToken) {
    return res.status(401).send('Unauthorized')
  }
  res.send(
    `Hello ${req.user.username}, you have access to this protected route.`,
  )
})

module.exports = router
