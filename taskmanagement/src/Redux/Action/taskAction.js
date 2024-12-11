import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url ='https://taskmanagementbackend-3.onrender.com/allTasks';
const url1 ='https://taskmanagementbackend-3.onrender.com/addTask';


export const getAlltasks = createAsyncThunk(
    "configuration:allTasks",
    async ( _ ,{ rejectWithValue }) => {
        try {
            const data = await axios({
                url,
                method: "get",
                
            });
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const saveData = createAsyncThunk(
    "saveData",
    async(data,{rejectWithValue})=>{
        try{
            const response = await axios.post(url1,data) 
            return response.data
        }catch(error){
            return rejectWithValue(error);

        }
    
    })

    export const deleteData = createAsyncThunk(
        "deleteData",
        async(id,{rejectWithValue})=>{
            try{
                const response = await axios.delete(`https://taskmanagementbackend-3.onrender.com/taskItem/${id}`) 
                return response.data
            }catch(error){
                return rejectWithValue(error);
    
            }
        
        })

        export const loginUser = createAsyncThunk(
            "loginUser",
            async(data,{rejectWithValue})=>{
                try{
                    const response = await axios.post("https://taskmanagementbackend-3.onrender.com/auth/login",data) 
                    return response.data
                }catch(error){
                    return rejectWithValue(error);
        
                }
            
            })