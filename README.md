# Users & Articles Backend

## Overview

This project is a simple Express.js server showcasing the use of two template engines: **PUG** and **EJS**. The server handles user and article data, rendering views dynamically using these engines.

---

## Features

- **Dynamic Rendering**:
  - PUG is used for `/users` routes.
  - EJS is used for `/articles` routes.
- **Static File Support**: Serves CSS and other static files from the `public` directory.
- **Dynamic Routes**: Supports detailed views for individual users and articles.

---

### Prerequisites

- Node.js (version 14 or above)
- npm (Node Package Manager)

## Installation

Follow these steps to set up and run the server locally.

#### Clone the repository:

```bash
git clone <repository-url>
```

cd users-articles-backend

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

## Testing Routes

You can test the server's routes in your browser or using tools like Postman.

### PUG Routes:

- **User List**: [http://localhost:8000/users](http://localhost:8000/users)
- **User Details**: [http://localhost:8000/users/1](http://localhost:8000/users/1)

### EJS Routes:

- **Articles List**: [http://localhost:8000/articles](http://localhost:8000/articles)
- **Article Details**: [http://localhost:8000/articles/1](http://localhost:8000/articles/1)

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

## License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this project, provided that the original copyright and permission notice are included in all copies or substantial portions of the Software.
