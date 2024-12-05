const express = require('express')
const path = require('path')
const app = express()

// Middleware for serving static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')))

// Configure PUG for /users routes
app.set('views', path.join(__dirname, 'views', 'pug'))
app.set('view engine', 'pug')

// Configure EJS for /articles routes
app.engine('ejs', require('ejs').__express)
app.set('views', path.join(__dirname, 'views', 'ejs'))

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
  res.render('users', { title: 'User List', users })
})

app.get('/users/:userId', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.userId))
  if (!user) {
    return res.status(404).send('User not found')
  }
  res.render('userDetails', { title: 'User Details', user })
})

// Routes for /articles (EJS)
app.get('/articles', (req, res) => {
  res.render('articles', { title: 'Articles', articles })
})

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.articleId))
  if (!article) {
    return res.status(404).send('Article not found')
  }
  res.render('articleDetails', { title: 'Article Details', article })
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
)
