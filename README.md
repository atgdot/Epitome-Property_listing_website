# Epitome - Modern Property Management System

A full-stack property management system built with React, Node.js, and MongoDB, featuring real-time property listings, advanced search capabilities, and interactive maps.

## 🌟 Features

- **Property Management**
  - Create, read, update, and delete property listings
  - Multiple image upload support
  - Detailed property information management
  - Property categorization (Residential, Commercial, Trending, Featured)

- **Advanced Search**
  - Location-based property search
  - Category and subcategory filtering
  - Price range filtering
  - Interactive map integration

- **User Authentication**
  - Secure user authentication
  - Role-based access control
  - JWT-based session management

- **Interactive Maps**
  - Google Maps integration
  - Property location visualization
  - Interactive property markers

- **Modern UI/UX**
  - Responsive design
  - Smooth animations with Framer Motion
  - Interactive charts and data visualization
  - Carousel and slider components

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit for state management
- React Router for navigation
- TailwindCSS for styling
- Vite as build tool
- Various UI libraries:
  - Framer Motion for animations
  - React Icons
  - Chart.js for data visualization
  - Swiper for carousels
  - Leaflet for maps

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Cloudinary for image storage
- Redis for caching
- BullMQ for job queues
- Nodemailer for email notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Redis
- Cloudinary account

### Installation

1. Clone the repository
```bash
git clone [your-repository-url]
cd Epitome
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup
Create `.env` files in both server and client directories:

Server (.env):
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
REDIS_URL=your_redis_url
```

Client (.env):
```
VITE_API_URL=your_backend_url
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd ../client
npm start
```

## 📁 Project Structure

```
Epitome/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── redux/        # Redux store and slices
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
└── server/               # Backend Node.js application
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── middleware/  # Custom middleware
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   └── utils/       # Utility functions
    └── uploads/         # Temporary file storage
```

## 🔒 Security Features

- Helmet.js for security headers
- CORS configuration
- Input validation with express-validator
- Secure file upload handling
- Environment variable protection

## 📈 Performance Optimizations

- Redis caching for frequently accessed data
- Image optimization with Cloudinary
- Lazy loading of components
- Efficient state management with Redux Toolkit

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- All the open-source libraries and tools used in this project
- The development community for their continuous support 