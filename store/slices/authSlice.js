import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: undefined,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
