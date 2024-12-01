import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  userData: any,
  location:any
}

const initialState: AuthState = {
    userData: {},
    location:{}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserdata:(state,data: PayloadAction<Object>)=>{
        state.userData = data?.payload
    },
    setLocation:(state,data:PayloadAction<Object>)=>{
      state.location=data?.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUserdata,setLocation} = authSlice.actions

export default authSlice.reducer