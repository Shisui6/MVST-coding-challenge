/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../configureStore'
import axios from 'axios';

interface UserState {
  user: {
    name: string;
    username: string;
    profileUrl: string;
    bio: string;
    followerCount: number;
    followingCount: number;
  };
  repos: Array<{
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
  }>;
  isLoading: boolean;
  error: boolean;
}

const initialState: UserState = {
  user: {
    name: '',
    username: '',
    profileUrl: '',
    bio: '',
    followerCount: 0,
    followingCount: 0,
  },
  repos: [],
  isLoading: false,
  error: false
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (data: string) => {
    const response = await axios.get(`https://api.github.com/users/${data}`);
    return response.data;
  },
);

export const fetchRepos = createAsyncThunk(
  'user/fetchRepos',
  async (data: string) => {
    const response = await axios.get(`https://api.github.com/users/${data}/repos`);
    return response.data;
  },
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {
        name: '',
        username: '',
        profileUrl: '',
        bio: '',
        followerCount: 0,
        followingCount: 0,
      };
      state.repos = [];
      state.isLoading = false;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const user = {
          name: action.payload.name,
          username: action.payload.login,
          profileUrl: action.payload.avatar_url,
          bio: action.payload.bio,
          followerCount: action.payload.followers,
          followingCount: action.payload.following,
        }
        state.user = user;
        state.error = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchRepos.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectRepos = (state: RootState) => state.user.repos;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectError = (state: RootState) => state.user.error;

export default userSlice.reducer;
