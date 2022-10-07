import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice';
import mainSlice from './mainSlice';

 export const store = configureStore({
  reducer: {
    home:homeSlice,
    main:mainSlice,
  },
});
