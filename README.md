# AI Interview SaaS

A modern AI Interview SaaS web application built with:

- **Frontend**: React.js + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: Supabase Auth
- **Payments**: Razorpay
- **Deployment Targets**: Vercel frontend + Render/ Railway/ Fly.io backend

## Features

- Upload resumes and get AI-generated interview questions
- Practice HR + technical interviews
- Conduct voice interviews
- Receive AI feedback
- Get performance analytics
- Track interview history
- Improve communication skills
- Simulate real company interviews

## Deployment Checklist

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas cluster
- Supabase project
- Razorpay account

### Installation

1. Clone the repository.
2. Install frontend dependencies:
   ```bash
   cd ai-interview
   npm install
   ```
3. Install backend dependencies from the `server/` folder:
   ```bash
   cd ../server
   npm install
   ```

### Environment Variables

**Backend `.env` (root of repository):**

```bash
# Server Configuration
PORT=4000

# MongoDB - Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ai-interview?retryWrites=true&w=majority

# Supabase - Get from your Supabase project settings
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key

# Razorpay - Get from Razorpay dashboard
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret

# CORS - Add your Vercel frontend URL
CORS_ORIGIN=https://your-app.vercel.app,http://localhost:5173
```

**Frontend `ai-interview/.env.local`:**

```bash
# Backend API URL
VITE_API_URL=https://your-backend.onrender.com/api

# Supabase Auth - Same as backend SUPABASE_*
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Razorpay - Public key ID from Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
```

### Running the Application

1. Start the frontend:
   ```bash
   cd ai-interview
   npm run dev
   ```
2. Start the backend:
   ```bash
   cd server
   npm run dev
   ```

### Building for Production

**Frontend:**
```bash
cd ai-interview
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## Deployment Configuration

### Frontend (Vercel)

1. Import repository to Vercel
2. Set root directory to `ai-interview`
3. Add environment variables in Vercel dashboard:
   - `VITE_API_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_RAZORPAY_KEY_ID`

### Backend (Render/Railway/Fly.io)

1. Create new Node.js service
2. Set build command: `cd server && npm install`
3. Set start command: `cd server && npm start`
4. Add environment variables listed above

## API Endpoints

- `GET /health` - Health check for uptime monitoring
- `POST /api/users/sync` - Sync user from Supabase token (creates user if not exists)
- `GET /api/users/me` - Get current user profile
- `POST /api/actions/consume` - Consume credits for an action
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify Razorpay payment
- `POST /api/ai/chat` - AI chat endpoint

## Notes

- The frontend uses Supabase Auth for authentication
- The backend verifies Supabase bearer tokens and uses MongoDB
- Ensure MongoDB Atlas network access allows connections from your backend host
- The app is configured for separate frontend/backend deployments

## License

MIT