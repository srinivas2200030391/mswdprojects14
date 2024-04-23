import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userSlice";

const initialState = {
  mode: "light",
  username:"",
  fullname:"",
  accountnumber:"",
  aadhar:"",
  age:"",
  address:"",
  balance:0,
  gender:"",
  phone:"",
  email:"",
  password:"",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loginUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    logoutUser: () => initialState,
  },
});


export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
