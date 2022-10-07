import { createSlice } from "@reduxjs/toolkit";


const initialState = []
const homeSlice = createSlice({
    name:"home",
    initialState,
    reducers:{
        add(state,action)
        {
            state.push(action.payload)
        },
        del(state)
        {
           return state=initialState
        }
    }
});

export const homeState = state => state.home;

export const {add , del} = homeSlice.actions;

export default homeSlice.reducer;


