import { createSlice } from "@reduxjs/toolkit";
import { deleteData, getAlltasks, loginUser, saveData } from "../Action/taskAction";

const initialState = {
    todoTasks: [],
    isLoading: false, // Added default value for `isLoading`
    message:""
};

const getAllTodotasks = createSlice({
    name: "allTodoTasks",
    initialState,
    reducers: {}, // Can stay empty if no synchronous reducers are defined
    extraReducers: (builder) => {
        builder
            .addCase(getAlltasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAlltasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoTasks = action.payload;
            })
            .addCase(getAlltasks.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(saveData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message
            })
            .addCase(saveData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message

            })
            .addCase(deleteData.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
            })
    },
});

export default getAllTodotasks.reducer;
