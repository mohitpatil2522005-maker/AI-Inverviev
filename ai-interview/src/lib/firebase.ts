import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Aapke web app ka personal Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9JqXTqlYwnBtdn4BYTqe6vkXy6Wy71DU",
  authDomain: "device-streaming-7cad160e.firebaseapp.com",
  projectId: "device-streaming-7cad160e",
  storageBucket: "device-streaming-7cad160e.firebasestorage.app",
  messagingSenderId: "556151601322",
  appId: "1:556151601322:web:44ac0f06193eae83d978d3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only in browser environment
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;