import { createSlice } from "@reduxjs/toolkit";


const initialState = []
const mainSlice = createSlice({
    name:"main",
    initialState,
    reducers:{
        add1(state,action)
        {
            state.push(action.payload)
        },
        
    }
});

export const mainState = state => state.main;

export const {add1} = mainSlice.actions;

export default mainSlice.reducer;


