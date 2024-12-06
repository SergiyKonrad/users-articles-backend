require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const themeRoutes = require('./routes/theme')
const app = express()

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Middleware for cookies and JSON parsing
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Global Middleware for theme and favicon to simplify route handlers (MUST come before routes)

// app.use((req, res, next) => {
//   res.locals.favicon = '/favicon.ico'
//   res.locals.theme = req.cookies.theme || 'default'
//   next()
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

// Routes for /users (PUG)

app.get('/users', (req, res) => {
  const theme = req.cookies.theme || 'default' // Default theme if no cookie exists
  res.render('users', {
    title: 'User List',
    users,
    theme, // Explicitly pass the theme
    favicon: res.locals.favicon, // Explicitly pass the favicon
  })
})

// global defaults approach for widely shared values

// app.get('/users', (req, res) => {
//   app.set('views', path.join(__dirname, 'views', 'pug')) // Temporarily set PUG views directory
//   app.set('view engine', 'pug') // Temporarily set PUG as the engine
//   res.render('users', { title: 'User List', users })
// })

app.get('/users/:userId', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.userId))
  if (!user) {
    return res.status(404).send('User not found')
  }
  app.set('views', path.join(__dirname, 'views', 'pug'))
  app.set('view engine', 'pug')
  res.render('userDetails', { title: 'User Details', user })
})

// Routes for /articles (EJS)

app.get('/articles', (req, res) => {
  const theme = req.cookies.theme || 'default'
  res.render('articles', {
    title: 'Articles',
    articles,
    theme, // Explicitly pass the theme
    favicon: '/favicon.ico', // Explicitly pass the favicon
  })
})

// global defaults approach for widely shared values

// app.get('/articles', (req, res) => {
//   app.set('views', path.join(__dirname, 'views', 'ejs'))
//   app.set('view engine', 'ejs')
//   res.render('articles', { title: 'Articles', articles })
// })

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.articleId))
  if (!article) {
    return res.status(404).send('Article not found')
  }
  app.set('views', path.join(__dirname, 'views', 'ejs'))
  app.set('view engine', 'ejs')
  res.render('articleDetails', { title: 'Article Details', article })
})

// Use separate authentication routes (JWT logic).
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
