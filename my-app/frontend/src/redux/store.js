import {configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import activitysReducer from "./slices/activitysSlice"
import detailsActivityReducer from "./slices/detailsSlice"

export const store = configureStore ({
    reducer : {
        auth : authReducer,
        activitys : activitysReducer,
        activity : detailsActivityReducer
    }
})