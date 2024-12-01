import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface homeInterface {


}

const initialState: homeInterface = {

}

export const settingSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {

  },
})

// Action creators are generated for each case reducer function
export const {} = settingSlice.actions

export default settingSlice.reducer