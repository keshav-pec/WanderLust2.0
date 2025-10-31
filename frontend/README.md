# WanderLust - Frontend

Modern React frontend for WanderLust, a property listing platform built with React, Vite, and React Router.

## Features

- **React 18**: Latest React features with Hooks
- **Vite**: Lightning-fast development with HMR
- **React Router**: Client-side routing
- **JWT Authentication**: Secure token-based auth
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: User-friendly feedback
- **Context API**: Global state management
- **Axios**: HTTP client for API calls

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **CSS3** - Styling

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Backend API running on `http://localhost:8080`

### Installation

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (already created):
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

### Running the App

Development mode:
```bash
npm run dev
```

The app will start on `http://localhost:5173` (or next available port)

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ListingDetail.jsx
│   │   └── ListingForm.jsx
│   ├── services/         # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── listingService.js
│   │   └── reviewService.js
│   ├── App.jsx           # Main app component
│   ├── App.css           # Global styles
│   ├── main.jsx          # Entry point
│   └── index.css         # Base styles
├── .env                  # Environment variables
├── index.html
├── package.json
└── vite.config.js
```

## Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/listings/:id` | ListingDetail | Public |
| `/listings/new` | ListingForm | Protected |
| `/listings/:id/edit` | ListingForm | Protected |

## License

ISC
