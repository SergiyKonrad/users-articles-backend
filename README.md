# Users & Articles Backend

## Overview

This project is a simple Express.js server showcasing the use of two template engines: **PUG** and **EJS**. The server handles user and article data, rendering views dynamically using these engines. It also includes **JWT-based authentication**, theme preference storage using **cookies**, and support for serving a custom favicon.

---

## Features

- **Dynamic Rendering**:
  - **PUG** for `/users` routes.
  - **EJS** for `/articles` routes.
- **JWT Integration**:
  - User authentication and protected routes with **JWT (JSON Web Tokens)**.
- **Cookie Support**:
  - Theme preference stored in cookies using `cookie-parser`.
  - Secure token storage with `httpOnly` cookies for authentication.
- **Static File Support**:
  - Serves CSS and other static files from the `public` directory.
  - Custom `favicon.ico` served for all pages.
- **Dynamic Routes**:
  - Supports detailed views for individual users and articles.

---

## Prerequisites

- **Node.js** (version 14 or above)
- **npm** (Node Package Manager)

---

## Installation

Follow these steps to set up and run the server locally.

### Clone the Repository

Navigate to the desired directory in your terminal and run:

```bash
git clone https://github.com/SergiyKonrad/users-articles-backend.git

```

You can also view the repository on GitHub:

```
https://github.com/SergiyKonrad/users-articles-backend.git

```

#### Install dependencies:

```
npm install
```

#### Start the server:

```
npm start
```

#### Alternatively, for development:

```
npm run dev
```

#### Visit the server in your browser at:

```
http://localhost:8000
```

## Routes

### `/users` (PUG)

#### GET /users:

- **Description**: Displays a list of users.
- **Response Data**:
  - `id`: The user's ID.
  - `name`: The user's name.
  - `email`: The user's email.

#### GET /users/:userId:

- **Description**: Displays details for a specific user.
- **Parameters**:
  - `userId`: The ID of the user to fetch.
- **Response Data**:
  - `name`: The user's name.
  - `email`: The user's email.

### `/articles` (EJS)

#### GET /articles:

- **Description**: Displays a list of articles.
- **Response Data**:
  - `id`: The article's ID.
  - `title`: The article's title.
  - `content`: The article's content.

#### GET /articles/:articleId:

- **Description**: Displays details for a specific article.
- **Parameters**:
  - `articleId`: The ID of the article to fetch.
- **Response Data**:
  - `title`: The article's title.
  - `content`: The article's content.

### Authentication Routes (`/register`, `/login`, `/protected`)

#### **POST /register**

Registers a new user by accepting `username` and `password`.

#### **POST /login**

Authenticates the user and returns a JWT stored in an `httpOnly` cookie.

#### **GET /protected**

A protected route accessible only to authenticated users with a valid JWT.

### Theme Route (`/set-theme`)

#### **POST /set-theme**

Sets the user's theme preference (e.g., dark or white) in a cookie with a 7-day expiry.

---

### JWT Integration

This project uses **JSON Web Tokens (JWT)** for secure authentication:

- The `authToken` is stored in an `httpOnly` cookie for security.
- The token is verified on protected routes to ensure that only authenticated users can access them.

### Cookie Management

- Cookies are parsed and managed using **cookie-parser**.
- **Theme Cookie**: Stores user preferences for site themes (e.g., dark or white).
- **authToken Cookie**: Stored as `httpOnly` to enhance security and prevent client-side tampering.

---

### Serving Static Files and Favicon

- Static files (e.g., CSS) are served from the `public` directory.
- A custom `favicon.ico` is provided and served for all pages.

## Testing API Endpoints in DevTools Console

### Register a New User

fetch('/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
username: 'testuser',
password: 'password',
}),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err));

### Login with Existing User

fetch('/login', {
method: 'POST',
credentials: 'include',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
username: 'testuser',
password: 'password',
}),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err));

### Access Protected Route

fetch('/protected', {
method: 'GET',
credentials: 'include', // Ensure cookies are sent
})
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err));

### Set Theme to White

fetch('/set-theme', {
method: 'POST',
credentials: 'include',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ theme: 'white' }),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err));

### Set Theme to Dark

fetch('/set-theme', {
method: 'POST',
credentials: 'include',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ theme: 'dark' }),
})
.then(response => response.text())
.then(data => console.log(data))
.catch(err => console.error(err));

## License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this project, provided that the original copyright and permission notice are included in all copies or substantial portions of the Software.
