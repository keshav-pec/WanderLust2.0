# WanderLust - Backend API

Backend REST API for WanderLust, a property listing platform built with Node.js, Express, and MongoDB.

## Features

- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Well-structured API endpoints
- **MongoDB**: Database with Mongoose ODM
- **File Upload**: Image upload to Cloudinary
- **Validation**: Request validation with Joi
- **Error Handling**: Centralized error handling middleware

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload
- **Joi** - Validation

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account

### Installation

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials:
   ```env
   NODE_ENV=development
   PORT=8080
   ATLASDB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=http://localhost:5173
   ```

### Running the Server

Development mode (with nodemon):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/logout` - Logout user (Protected)

### Listings

- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (Protected)
- `PUT /api/listings/:id` - Update listing (Protected, Owner only)
- `DELETE /api/listings/:id` - Delete listing (Protected, Owner only)

### Reviews

- `GET /api/listings/:id/reviews` - Get all reviews for a listing
- `POST /api/listings/:id/reviews` - Create review (Protected)
- `PUT /api/listings/:id/reviews/:reviewId` - Update review (Protected, Author only)
- `DELETE /api/listings/:id/reviews/:reviewId` - Delete review (Protected, Author only)

## API Response Format

Success Response:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error Response:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Project Structure

```
backend/
├── config/           # Configuration files
│   ├── cloudinary.js
│   └── passport.js
├── controllers/      # Route controllers
│   ├── auth.controller.js
│   ├── listing.controller.js
│   └── review.controller.js
├── middleware/       # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── models/          # Mongoose models
│   ├── user.model.js
│   ├── listing.model.js
│   └── review.model.js
├── routes/          # API routes
│   ├── auth.routes.js
│   ├── listing.routes.js
│   └── review.routes.js
├── .env.example     # Environment variables template
├── .gitignore
├── package.json
└── server.js        # Entry point
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Environment (development/production) |
| `PORT` | Server port (default: 8080) |
| `ATLASDB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Frontend URL for CORS |

## Authentication Flow

1. User registers with username, email, and password
2. Password is hashed using bcrypt
3. On login, JWT token is generated
4. Token is sent to client and stored in localStorage
5. Client sends token in Authorization header for protected routes
6. Server validates token using Passport JWT strategy

## Error Handling

The API uses a centralized error handling middleware that:
- Catches all errors
- Formats error responses consistently
- Handles Mongoose validation errors
- Handles JWT errors
- Logs errors in development mode

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation
- Protected routes
- Owner/Author authorization checks

## License

ISC
