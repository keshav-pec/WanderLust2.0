# 🏠 WanderLust - Travel Property Listing Platform

> Inspired by Airbnb, built with modern MERN stack by Keshav Goyal

A full-stack property listing platform where users can discover, list, and review travel accommodations worldwide.

## 🌐 Live Demo

- **Frontend**: https://wander-lust2-0.vercel.app
- **Backend API**: https://wanderlust-b.vercel.app/api
- **Test Login**: Username: `keshav` | Password: `keshav`

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express 5
- **Database**: MongoDB Atlas
- **Authentication**: JWT (Passport.js)
- **Storage**: Cloudinary (images)
- **Styling**: CSS3 (Mobile-first)

## ✨ Features

- 🔐 User authentication (Register/Login)
- 🏘️ Browse & search property listings
- 📝 Create, edit, and delete listings
- ⭐ Write reviews with star ratings
- 📤 Image upload to cloud
- 📱 Fully responsive design
- 🎨 Modern UI with cherry red theme

## 📁 Project Structure

```
WanderLust/
├── backend/              # Express API server
│   ├── config/          # Database & passport config
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Auth & validation
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── scripts/         # Seed data script
│   └── server.js        # Entry point
├── frontend/            # React SPA
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable components
│       ├── context/     # Auth context
│       ├── pages/       # Page components
│       ├── services/    # API calls
│       └── App.jsx      # Main app component
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd WanderLust
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
NODE_ENV=development
PORT=8080
ATLASDB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8080/api
```

4. **Run the Application**

Start backend:
```bash
cd backend
npm run dev
```

Start frontend (in new terminal):
```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173`

### Seed Sample Data

```bash
cd backend
node scripts/seed.js
```

**Login credentials:**
- Username: `keshav`
- Password: `keshav`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings/:id` - Get single listing
- `POST /api/listings` - Create listing (auth)
- `PUT /api/listings/:id` - Update listing (auth)
- `DELETE /api/listings/:id` - Delete listing (auth)

### Reviews
- `GET /api/reviews/listing/:listingId` - Get reviews for listing
- `POST /api/reviews/listing/:listingId` - Create review (auth)
- `PUT /api/reviews/:reviewId` - Update review (auth)
- `DELETE /api/reviews/:reviewId` - Delete review (auth)

## 🎨 Design

- **Color Theme**: Cherry Red (#ff5a5f)
- **Typography**: Plus Jakarta Sans
- **Icons**: Font Awesome 6
- **Responsive**: Mobile-first approach

## 📝 License

MIT License - feel free to use this project for learning!

## 👨‍💻 Author

**Keshav Goyal**

Made with ❤️ for travelers worldwide!
