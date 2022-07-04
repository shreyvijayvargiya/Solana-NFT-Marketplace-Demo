import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userNfts: [],
  userSavedHistory: [],
  userSavedTokens: [],
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    addNfts: (state, action) => {
      return {
        ...state,
        userNfts: action.payload
      }
    },
    addHistory: (state, action) => {
      return {
        ...state,
        userSavedHistory: action.payload,
      };
    },
    addSavedToken: (state, action) => {
      return {
        ...state,
        userSavedTokens: action.payload,
      };
    }
  },
});

export const { addNfts, addHistory, addSavedToken } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
