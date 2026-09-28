import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import activitysReducer from "./slices/activitysSlice";
import detailsActivityReducer from "./slices/detailsSlice";
import resrvationReducer from "./slices/reservationSlice";
import guideActivityReducer from "./slices/guideActivitySlice";
import createActivityReducer from "./slices/activitysSlice";
import adminReducer from "./slices/adminSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    activitys: activitysReducer,
    activity: detailsActivityReducer,
    reservation: resrvationReducer,
    guideActivity: guideActivityReducer,
    createActivitys: createActivityReducer,
    admin: adminReducer,
  },
});
export default store;
