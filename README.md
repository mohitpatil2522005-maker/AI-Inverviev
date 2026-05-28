# AI Interview SaaS

A modern, production-ready AI Interview SaaS web application built with:

- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js (to be implemented)
- **Database**: MongoDB (to be implemented)
- **Authentication**: Firebase Google Auth + JWT
- **State Management**: Redux Toolkit
- **AI APIs**: OpenRouter API (GPT-4 / Claude / Gemini support) (to be integrated)
- **File Uploads**: Multer (to be implemented in backend)
- **Voice Features**: Web Speech API
- **Payments**: Razorpay
- **Deployment Ready**: Vercel + Render

## Features

- Upload resumes and get AI-generated interview questions
- Practice HR + technical interviews
- Conduct voice interviews
- Receive AI feedback
- Get performance analytics
- Track interview history
- Improve communication skills
- Simulate real company interviews

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install client dependencies:
   ```bash
   cd client
   npm install
   ```
3. Create a `.env.local` file in the client directory with the following variables:
   ```
   VITE_API_URL=http://localhost:4000
   VITE_FIREBASE_API_KEY=<your-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-sender-id>
   VITE_FIREBASE_APP_ID=<your-firebase-app-id>
   VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
   ```
4. Start the client development server:
   ```bash
   npm run dev
   ```

### Backend Setup (to be implemented)

1. Navigate to the server directory
2. Install server dependencies
3. Set up environment variables for the backend
4. Start the server

## Project Structure

```
client/
+- public/
+- src/
¦  +- components/
¦  ¦  +- layout/
¦  +- pages/
¦  +- lib/
¦  +- redux/
¦  +- hooks/
¦  +- utils/
¦  +- assets/
¦  +- App.tsx
¦  +- index.css
¦  +- main.tsx
+- .env.local
+- package.json
+- tsconfig.json
+- vite.config.ts
+- postcss.config.js
```

## Environment Variables

The client requires the following environment variables in `.env.local`:

- `VITE_API_URL`: The base URL for the API (e.g., `http://localhost:4000`)
- `VITE_FIREBASE_API_KEY`: Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Firebase app ID
- `VITE_RAZORPAY_KEY_ID`: Razorpay key ID

## Notes

- This is a basic setup with placeholder pages. The actual implementation of the features (like live interview, resume analyzer, etc.) needs to be completed.
- The backend is not yet implemented. You will need to set up a Node.js/Express server with MongoDB, Firebase Admin SDK, Razorpay integration, and OpenRouter API integration.
- Authentication is set up with Firebase (Google and email/password) and JWT tokens are stored in localStorage.
- Redux is used for state management, with an auth slice handling user authentication state.

## Future Work

- Implement the backend APIs for authentication, interview sessions, resume analysis, payment processing, etc.
- Integrate OpenRouter AI API for generating interview questions and feedback.
- Implement Web Speech API for voice-to-text in the live interview page.
- Add Razorpay payment integration for subscription plans.
- Create the actual UI components for each feature as per the design specifications.
- Add protected routes to ensure only authenticated users can access certain pages.
- Implement role-based access control for admin panel.
- Add real-time updates using WebSockets or SSE for live interview features.
- Optimize performance with lazy loading, code splitting, and caching.
- Deploy frontend to Vercel and backend to Render.

## License

MIT
