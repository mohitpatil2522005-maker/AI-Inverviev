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

## System & AI Integration Reference

### 🛠️ Core Tech Stack (MERN)

- **MongoDB:** Acts as the primary database to store user information (such as Name, Email, and Credits) and the AI agent's data collections.
- **Express.js & Node.js:** Used to build the backend server, configure routes, and handle API requests through controllers.
- **React.js:** Used to design the frontend (client-side) components, such as the home page and the overall User Interface (UI).

### 📦 Important Backend Packages

- **Nodemon:** Automatically restarts the backend server whenever any changes are made to the codebase, saving development time.
- **CORS (Cross-Origin Resource Sharing):** Enables secure data transfer and communication between the frontend and backend without triggering cross-origin errors.
- **Mongoose:** Provides a straightforward, object-oriented way to connect to the MongoDB database and create structured data schemas.

### 💳 Third-Party Integrations & Features

- **Razorpay:** Integrated as the payment gateway for the application's credit system, allowing users to securely purchase interview credits.
- **PDF Downloader/Generator:** Allows users to download their final interview performance report as a PDF file at the end of the session.
- **Speech-to-Text & Text-to-Speech:** Enables voice interactivity, allowing the AI to ask questions aloud and the user to answer verbally using their microphone.

---

### 🤖 Step-by-Step AI Integration Process

**1. Generate an API Key**
First, create an account on an AI provider's platform (such as Google AI Studio for Gemini or the OpenAI Dashboard) to generate a unique, secret **API Key**. This key grants your server the necessary permissions to communicate with the AI model.

**2. Store in Environment Variables (`.env`)**
For security reasons, the API key should never be hardcoded into the application. It is stored securely in a `.env` file at the root of your backend project:
`GEMINI_API_KEY=your_secret_api_key_here`

**3. Install the AI SDK in the Backend**
Install the necessary official package in your Node.js/Express server to connect with the AI provider.

- *For Google Gemini:* `npm install @google/generative-ai`
- *For OpenAI:* `npm install openai`

**4. Controller Setup and Prompt Engineering**
Create a controller function in the backend that formats and sends instructions (prompts) to the AI based on the user's data:

- **Resume Parsing:** Extract the raw text from the resume uploaded by the user.
- **Prompt Structure:** Assign a specific persona to the AI. For example: *"You are an Expert Technical Interviewer. Generate 5 challenging interview questions based on this candidate's Resume and target Job Role."*
- **API Request:** Send this structured prompt to the AI model using the installed SDK. The AI processes the context and returns the interview questions and evaluation criteria as a JSON response.

**5. Connect to the Frontend (React)**
When the user clicks "Start Interview":

- The React frontend sends a network request to the specific backend route using libraries like Axios or Fetch.
- The backend retrieves the generated questions from the AI and sends them back to the frontend.
- Finally, Text-to-Speech libraries convert these text questions into audio so the AI can "speak" to the user, and Speech-to-Text transcribes the user's spoken answers back into text so the AI can evaluate them.

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
�  +- components/
�  �  +- layout/
�  +- pages/
�  +- lib/
�  +- redux/
�  +- hooks/
�  +- utils/
�  +- assets/
�  +- App.tsx
�  +- index.css
�  +- main.tsx
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
