require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

// Middleware for serving static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')))

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
  app.set('views', path.join(__dirname, 'views', 'pug')) // Temporarily set PUG views directory ensuring the server looks for templates only in that folder for the current route.
  app.set('view engine', 'pug') // Temporarily set PUG as the engine
  res.render('users', { title: 'User List', users })
})

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
  app.set('views', path.join(__dirname, 'views', 'ejs'))
  app.set('view engine', 'ejs')
  res.render('articles', { title: 'Articles', articles })
})

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.articleId))
  if (!article) {
    return res.status(404).send('Article not found')
  }
  app.set('views', path.join(__dirname, 'views', 'ejs')) // Temporarily set EJS views directory
  app.set('view engine', 'ejs') // Temporarily set EJS as the engine
  res.render('articleDetails', { title: 'Article Details', article })
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
)

/*
The set is inside app.get to ensure each route uses the appropriate view engine (PUG or EJS) and views directory without affecting other routes.
----------
Without both app.set('views') and app.set('view engine'), the server might:
Look in the wrong directory for templates.
Use the wrong engine, leading to errors.
-----------
Avoid Situations Where Different Routes Need Different Template Engines.
-----------
If you decide to stick with one template engine globally, you wouldn’t need such "temporary" configurations.
*/
