# AI Interview SaaS

A modern AI Interview SaaS web application built with:

- **Frontend**: React.js + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: Supabase Auth
- **State Management**: Redux Toolkit
- **AI APIs**: OpenRouter API (GPT-4 / Claude / Gemini support)
- **File Uploads**: Multer
- **Voice Features**: Web Speech API
- **Payments**: Razorpay
- **Deployment Targets**: Vercel frontend + Render backend

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
`OPENROUTER_API_KEY=your_secret_api_key_here`

**3. Install the AI SDK in the Backend**
Install the necessary official package in your Node.js/Express server to connect with the AI provider.

- *For OpenRouter-compatible models:* `npm install openai`

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

1. Clone the repository.
2. Install frontend dependencies:
   ```bash
   cd ai-interview
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
4. Create a `.env.local` file in `ai-interview/` using the variables listed below.
5. Create a `.env` file at the repo root using the backend variables listed below.
6. Start the frontend:
   ```bash
   npm run dev
   ```
7. Start the backend from the `server/` folder:
   ```bash
   npm start
   ```

## Deployment & Required Environment Variables

Set the following environment variables for production (Vercel / Render):

- `MONGODB_URI` — MongoDB connection string
- `SUPABASE_URL` — Your Supabase project URL (https://your-project.supabase.co)
- `SUPABASE_ANON_KEY` — Supabase anon/public key (client-side)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (only if backend needs elevated privileges; keep secret)
- `RAZORPAY_KEY_ID` — Razorpay key id (publishable / used by client)
- `RAZORPAY_KEY_SECRET` — Razorpay key secret (server only)
- `CORS_ORIGIN` — comma-separated allowed origins (e.g., `https://your-vercel-domain.vercel.app`)
- `VITE_API_URL` — Frontend: API base URL (e.g., `https://api.yourapp.com/api`)

Migration

After deploying or before switching production, run the DB migration to rename `firebaseUid` to `authUid`:

```bash
# from repo root
MONGODB_URI="<your mongo uri>" node scripts/migrate-rename-authuid.js
```

If you want to remove the legacy `firebaseUid` field after migration, set `REMOVE_OLD=true` in the environment when running the script.

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

Frontend `ai-interview/.env.local`:

- `VITE_API_URL`: The base URL for the API, for example `https://your-backend.onrender.com/api`
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key
- `VITE_RAZORPAY_KEY_ID`: Razorpay public key ID

Backend `.env`:

- `PORT`: Server port, usually `4000`
- `MONGODB_URI`: MongoDB Atlas connection string
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anon key
- `RAZORPAY_KEY_ID`: Razorpay key ID
- `RAZORPAY_KEY_SECRET`: Razorpay key secret
- `CORS_ORIGIN`: Comma-separated allowed frontend origins

## Notes

- The frontend now uses Supabase Auth.
- The backend verifies Supabase bearer tokens and uses MongoDB plus Razorpay.
- The app still needs final production cleanup in a few unrelated TypeScript files before the frontend build is fully green.

## Future Work

- Implement the remaining interview generation and resume parsing workflows.
- Add file upload handling for resume documents.
- Add real-time updates using WebSockets or SSE for live interview features.
- Optimize performance with lazy loading, code splitting, and caching.
- Finish the remaining production TypeScript cleanup.
- Deploy frontend to Vercel and backend to Render.

## License

MIT
