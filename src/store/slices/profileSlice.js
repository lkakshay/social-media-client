import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
  posts: string[];
}

interface ProfileState {
  currentProfile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  currentProfile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.loading = false;
      state.currentProfile = action.payload;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.loading = false;
      state.currentProfile = action.payload;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    followUser: (state, action: PayloadAction<string>) => {
      if (state.currentProfile) {
        state.currentProfile.following.push(action.payload);
      }
    },
    unfollowUser: (state, action: PayloadAction<string>) => {
      if (state.currentProfile) {
        state.currentProfile.following = state.currentProfile.following.filter(
          (id) => id !== action.payload
        );
      }
    },
    addPostToProfile: (state, action: PayloadAction<string>) => {
      if (state.currentProfile) {
        state.currentProfile.posts.push(action.payload);
      }
    },
    removePostFromProfile: (state, action: PayloadAction<string>) => {
      if (state.currentProfile) {
        state.currentProfile.posts = state.currentProfile.posts.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  followUser,
  unfollowUser,
  addPostToProfile,
  removePostFromProfile,
} = profileSlice.actions;

export default profileSlice.reducer; 