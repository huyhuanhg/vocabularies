import { createSlice } from "@reduxjs/toolkit"
import { fetchLogin } from "./action"

const initialState = {
  email: '',
  photoUrl: '',
  fullName: ''
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogin.fulfilled, (state, { payload }) => {
        return {
          ...state,
          email: payload.email,
          photoUrl: payload.photoURL,
          fullName: payload.displayName,
        }
      })
  }
})

export default auth.reducer
