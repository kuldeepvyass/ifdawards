
# Home Page for IFDA

This is a code bundle for Home Page for IFDA. The original project is available at https://www.figma.com/design/89zwJ7AACsyDarvG5xkjTn/Home-Page-for-IFDA.

## Tech Stack

This project is built using the MERN stack:
- **MongoDB**: NoSQL database
- **Express.js**: Backend web framework
- **React**: Frontend library
- **Node.js**: JavaScript runtime

## Project Structure

```
├── server/                 # Backend (Express.js)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── src/                   # Frontend (React)
│   ├── app/               # Main app components
│   ├── components/        # Reusable components
│   └── styles/            # Stylesheets
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

## Running the code

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env` file and update MongoDB URI if needed

### Development

To run both frontend and backend concurrently:
```bash
npm start
```

To run frontend only:
```bash
npm run dev
```

To run backend only:
```bash
npm run server
```

To run backend with auto-restart (requires nodemon):
```bash
npm run server:dev
```

### Production

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Set `NODE_ENV=production` in `.env`

3. Start the server:
   ```bash
   npm run server
   ```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)# ifdawards
# ifdawards
