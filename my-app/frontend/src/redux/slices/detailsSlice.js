import {createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  activitys : null,
  loading : false ,
  error : null
}

export const getActivityById = createAsyncThunk(
    "activities/getActivityById",

    async(id ,{rejectWithValue}) =>{
      try {
        const response = await axios.get(`http://localhost:3000/activitys/${id}`)
        console.log("response.data =", response.data);
        console.log("activitys from response =", response.data.activitys);
        return response.data.activitys
        
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to get activitie"
        )
      }
    }
)


const activiryByIdSlice = createSlice({
  name : "activities",

  initialState ,
  reducers : {} ,
  extraReducers:(builder) =>{
    builder
    .addCase(getActivityById.pending,(state) => {
      state.loading = true
      state.error=null
    })
    .addCase(getActivityById.fulfilled,(state ,action) => {
      state.loading = false
      state.activitys = action.payload
      state.error=null
    })
        .addCase(getActivityById.rejected,(state ,action) => {
      state.loading = false
      state.error=action.payload
    })
  }
})

export default activiryByIdSlice.reducer