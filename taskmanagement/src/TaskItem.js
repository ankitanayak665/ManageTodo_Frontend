import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Draggable, Droppable } from 'react-beautiful-dnd';


function TaskItem({title,description,id,setInProgress,inProgress,index,handleDeleteItem,handleClickOpen,disable}) {
   
  return (
        <div>
              <Box
                sx={{ p: "5px", height: "auto", backgroundColor: "lightblue", mb: 1 }}                
              >
                <Box>
                  <Typography>{title}</Typography>
                  <Typography>{description}</Typography>
                  <Typography>Created at:</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "2px" }}>
                  <Button size="small" disabled={disable} variant="contained" sx={{ textTransform: "none" }} onClick={() => handleDeleteItem(id)}>Delete</Button>
                  <Button size="small" disabled={disable} variant="contained" sx={{ textTransform: "none" }} onClick={()=>handleClickOpen({"id":id,"type":"edit","title":title,"description":description})}>Edit</Button>
                  {/* <Button size="small" variant="contained" sx={{ textTransform: "none" }}>View Details</Button> */}
                </Box>
              </Box>
        {/* ))} */}
      </div>
      // )}  
    // </Draggable>
  );
}

export default TaskItem
