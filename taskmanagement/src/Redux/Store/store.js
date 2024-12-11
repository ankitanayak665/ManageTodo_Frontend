import { configureStore } from "@reduxjs/toolkit";
import getAllTodotasksReducer from "../Slice/taskSlice";
export const store = configureStore({
    reducer: {
      app: getAllTodotasksReducer,
    },
  });