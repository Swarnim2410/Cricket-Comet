import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      
      //action.payload contains data coming from the server
      //action.payload.data contains user details..
    //   console.log(action.payload.data);

    //ab hame initialState me data set karna hai jo state.{property} se hi set hota hai..
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
    },
    logoutRedux : (state,action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
    }
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
