import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchParent } from '../../src/api/parentApi';

interface AuthState {
  isAuthenticated: boolean;
  parentId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  parentId: null,
  loading: false,
  error: null,
};

// Thunk for handling login
export const login = createAsyncThunk(
  'auth/login',
  async (
    { phoneNumber, pin }: { phoneNumber: string; pin: string },
    { rejectWithValue }
  ) => {
    try {
      const parent = await fetchParent({ phoneNumber, pin });
      if (parent) {
        return parent.id;
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error: any) {
      return rejectWithValue('Failed to authenticate. Please try again later.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.parentId = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.isAuthenticated = true;
        state.parentId = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
