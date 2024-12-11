import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url ='https://https://managetodo-backend.onrender.com/allTasks';
const url1 ='https://managetodo-backend.onrender.com/addTask';


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
                const response = await axios.delete(`https://https://managetodo-backend.onrender.com/taskItem/${id}`) 
                return response.data
            }catch(error){
                return rejectWithValue(error);
    
            }
        
        })

        export const loginUser = createAsyncThunk(
            "loginUser",
            async(data,{rejectWithValue})=>{
                try{
                    const response = await axios.post("https://managetodo-backend.onrender.com/auth/login",data) 
                    return response.data
                }catch(error){
                    return rejectWithValue(error);
        
                }
            
            })