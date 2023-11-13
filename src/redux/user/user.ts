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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
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
      })
      .addCase(fetchRepos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.repos = action.payload;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectRepos = (state: RootState) => state.user.repos;
export const selectIsLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
