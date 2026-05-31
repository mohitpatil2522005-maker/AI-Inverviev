import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import api from '../lib/api';

interface AuthState {
  user: any;
  token: string | null;
  credits: number;
  plan: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  credits: 0,
  plan: 'free',
  loading: false,
  error: null,
};

export const syncUserWithBackend = createAsyncThunk(
  'auth/syncUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/sync');
      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/me');
      return response.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      await dispatch(syncUserWithBackend());
      return { user: userCredential.user, token };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const signupWithEmail = createAsyncThunk(
  'auth/signupWithEmail',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      await dispatch(syncUserWithBackend());
      return { user: userCredential.user, token };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      await dispatch(syncUserWithBackend());
      return { user: result.user, token };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      return;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateCreditsLocally: (state, action) => {
      state.credits = action.payload;
    },
    updatePlanLocally: (state, action) => {
      state.plan = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncUserWithBackend.fulfilled, (state, action) => {
        state.credits = action.payload.credits;
        state.plan = action.payload.plan;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.credits = action.payload.credits;
        state.plan = action.payload.plan;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.credits = 0;
        state.plan = 'free';
      });
  },
});

export const { clearError, updateCreditsLocally, updatePlanLocally } = authSlice.actions;
export default authSlice.reducer;
