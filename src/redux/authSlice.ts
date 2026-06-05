import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabaseClient';
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
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/me');
      return response.data.user;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const token = data.session?.access_token;
      if (token) localStorage.setItem('token', token);
      if (data.session) {
        await dispatch(syncUserWithBackend()).unwrap();
      }
      return { user: data.user, token: token || null };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const signupWithEmail = createAsyncThunk(
  'auth/signupWithEmail',
  async ({ email, password }: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const token = data.session?.access_token;
      if (token) localStorage.setItem('token', token);
      if (data.session) {
        await dispatch(syncUserWithBackend()).unwrap();
      }
      return { user: data.user, token: token || null };
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
      return { user: null, token: null }; 
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      localStorage.removeItem('token');
      return;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : String(err));
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
        state.token = action.payload.token || null;
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
        state.token = action.payload.token || null;
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loading = false;
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
