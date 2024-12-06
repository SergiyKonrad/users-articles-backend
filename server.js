require('dotenv').config()

const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const themeRoutes = require('./routes/theme')
const app = express()

// CORS configuration
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:8000', // Adjust for your frontend origin
  }),
)

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Middleware for cookies and JSON parsing
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Content Security Policy header (for development purposes only)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; connect-src 'self'",
  )
  next()
})

// Global Middleware for theme and favicon to simplify route handlers (MUST come before routes)

app.use((req, res, next) => {
  res.locals.favicon = '/favicon.ico'
  res.locals.theme = req.cookies.theme || 'default'
  next()
})

// Route for serving favicon if custom logic for serving the favicon needed.
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'favicon.ico'))
// })

// Dummy data
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

const articles = [
  { id: 1, title: 'Article One', content: 'This is the first article.' },
  { id: 2, title: 'Article Two', content: 'This is the second article.' },
]

// Route for /users (PUG template)
app.get('/users', (req, res) => {
  app.set('views', path.join(__dirname, 'views', 'pug')) // Temporarily set PUG views directory
  app.set('view engine', 'pug') // Temporarily set PUG as the engine
  const theme = req.cookies.theme || 'default'
  res.render('users', {
    title: 'User List',
    users,
    theme,
    favicon: res.locals.favicon, // Explicitly pass the favicon
  })
})

// Route for user details (PUG template)
app.get('/users/:userId', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.userId))
  if (!user) {
    return res.status(404).send('User not found')
  }
  app.set('views', path.join(__dirname, 'views', 'pug'))
  app.set('view engine', 'pug')
  res.render('userDetails', { title: 'User Details', user })
})

// Route for /articles (EJS template)
app.get('/articles', (req, res) => {
  app.set('views', path.join(__dirname, 'views', 'ejs'))
  app.set('view engine', 'ejs')
  res.render('articles', { title: 'Articles', articles })
})

// Route for article details (EJS template)
app.get('/articles/:articleId', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.articleId))
  if (!article) {
    return res.status(404).send('Article not found')
  }
  app.set('views', path.join(__dirname, 'views', 'ejs'))
  app.set('view engine', 'ejs')
  res.render('articleDetails', { title: 'Article Details', article })
})

// Use authentication routes (JWT logic).
app.use(authRoutes)
// Use theme routes
app.use(themeRoutes)

// Start the server.
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
)

/*
The set is inside app.get to ensure each route uses the appropriate view engine (PUG or EJS) and views directory without affecting other routes.
 If you switch to a single template engine globally, this can be removed.
----------
Without both app.set('views') and app.set('view engine'), the server might:
Look in the wrong directory for templates.
Use the wrong engine, leading to errors.
*/
