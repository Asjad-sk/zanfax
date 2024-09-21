// redux/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust the import path if necessary

// Define the shape of the user state
interface Address {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  landmark?: string;
}
interface UserState {
  email: string;
  userid:string;
  firstName?: string;
  lastName?: string;
  address?: Address;
  profilepicture?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  createdAt?: Date;
  loading: boolean;
  error: string | null;
}


// Define the initial state
const initialState: UserState = {
  email: '',
  userid:'',
  firstName: undefined,
  lastName: undefined,
  address: undefined,
  profilepicture: undefined,
  phoneNumber: undefined,
  isAdmin: false,
  createdAt: undefined,
  loading: false,
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload, loading: false };
    },
    // Action to clear user data
    clearUser(state) {
      return { ...initialState };
    },
    // Action to set loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Action to set error state
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

// Selector to get user data from the state
export const selectUser = (state: any) => state.user;

// Export the reducer to be used in the store
export default userSlice.reducer;
