import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/v1/";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ userData }) => {
    try {
      let res = await axios.post("/user/register", userData);
      console.log(res);
      if (res.status === 201) {
        let response = await axios.post(
          "/cart",
          {},
          {
            headers: {
              authorization: `Bearer ${res.data.user.token}`,
            },
          }
        );
        if (response.status === 201) {
          return res.data;
        } else {
          throw new Error("Error while Creating cart");
        }
      } else {
        throw new Error("Error while Registering User");
      }
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ userData }) => {
    try {
      let res = await axios.post("/user/login", userData);
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      (state.user = null), (state.loading = false);
      state.error = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    [registerUser.rejected]: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.error.message;
    },
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    [loginUser.rejected]: (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
