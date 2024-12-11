import { autocompleteClasses, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Paper, Select, Snackbar,IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; // Correctly importing named exports
import { deleteData, getAlltasks, saveData } from './Redux/Action/taskAction';

function Tasks() {
  const [openToast, setOpenToast] = useState(false);
  const [allTasks,setAllTasks] = useState([])
  const [inProgress,setInProgress] = useState([])
  const [done,setDone] = useState([])
  const [message,setMessage]=useState("")
  const[id,setId]= useState("")

  const dispatch = useDispatch();
  const messageInfo = useSelector((state)=>state?.app?.message)
  const todoTasks = useSelector((state) => state?.app?.todoTasks?.data);

  const handleDragEnd =(result)=>{
    const { source, destination } = result;
     // If dropped outside the list
     if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(allTasks);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      
      // Update state based on which column is being modified
      if (source.droppableId === 'paper1') {
        setAllTasks(items);
      } else {
        setInProgress(items);
      }
    } else {
      // Moving between lists
      const sourceItems = Array.from(allTasks);
      const destItems = Array.from(inProgress);
      const doneItems = Array.from(done);
      // const [movedItemFromColumn3] = doneItems.splice(source.index, 1);
      
      // Check if dragging from firstColumn to secondColumn
      if (source.droppableId === 'paper1' && destination.droppableId === 'paper2') {
      const [movedItemFromColumn1] = sourceItems.splice(source.index, 1);

        destItems.splice(destination.index, 0, movedItemFromColumn1);
        
        setAllTasks(sourceItems);
        setInProgress(destItems);
      }else if(source.droppableId === 'paper2' && destination.droppableId === 'paper3'){
      const [movedItemFromColumn2] = destItems.splice(source.index, 1);

        doneItems.splice(destination.index, 0, movedItemFromColumn2);
        setInProgress(destItems);
        setDone(doneItems);
        
      }
    else if(source.droppableId === 'paper2' && destination.droppableId === 'paper1'){
      const [movedItemFromColumn2] = destItems.splice(source.index, 1);

      sourceItems.splice(destination.index, 0, movedItemFromColumn2);

      setInProgress(destItems);
      setAllTasks(sourceItems);
      
    }
    else if(source.droppableId === 'paper3' && destination.droppableId === 'paper2'){
      const [movedItemFromColumn3] = doneItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, movedItemFromColumn3);
      setInProgress(destItems);
      setDone(doneItems);
      
    }
      else {
        // Moving back to the firstColumn
      const [movedItemFromColumn1] = sourceItems.splice(source.index, 1);

        sourceItems.splice(destination.index, 0, movedItemFromColumn1);
        setAllTasks(sourceItems);
        setInProgress(destItems);
      }
    }
  }

  

  // useEffect to fetch tasks on component mount
  useEffect(() => {
    dispatch(getAlltasks());
  }, []);
  useEffect(()=>{
    setAllTasks(todoTasks); 
  },[todoTasks])
  useEffect(()=>{
    if(messageInfo){
    setOpenToast(true)
    }
  },[])

  
    const [taskDetail,setTaskDetail] = useState({
        title:"",
        description:""
    })
    
    const handleDescription =(value)=>{
        setTaskDetail({...taskDetail,
            description:value
        })
    }
    
    const handleTitle =(value)=>{
        setTaskDetail({...taskDetail,
            title:value
        })
    }
    const [open, setOpen] = useState(false);
    const [editValue,setEditValue]=useState({
      title:"",
      description:""
    })
    const handleClickOpen = (value) => {
      if(value.id){
        setId(value.id)
        setTaskDetail({
          title:value.title,
          description:value.description,
          id:value,id
      })
      }else{
        setId("")
        setTaskDetail({
          title:"",
          description:""
      })
      }
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleEdit = async(id)=>{
        try {
          
          // Send a Patch request to /Tasks with taskDetail as data
          const response = await axios.patch(`https://managetodo-backend.onrender.com/editTask`, taskDetail);
    
          handleClose(); // Call handleClose to close any dialog or modal if needed
        } catch (error) {
        }
        
        dispatch(getAlltasks());
      }
      const handleSave = async () => {
        try {
          
          dispatch(saveData(taskDetail)).then(()=>{
            dispatch(getAlltasks());
            setOpenToast(true)
          })
    
          handleClose(); // Call handleClose to close any dialog or modal if needed
        } catch (error) {
        }
    
      }; 
      const handleDeleteItem =async(id)=>{
        try {
          dispatch(deleteData(id)).then(()=>{
        dispatch(getAlltasks());
        setOpenToast(true)
          })
          // const response = await axios.delete(`https://taskmanagementbackend-3.onrender.com/taskItem/${id}`);
        } catch (error) {
        }
        
        
      }
      const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenToast(false);
      };   
      const action = (
        <React.Fragment>
          <Button color="secondary" size="small" onClick={handleCloseToast}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseToast}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

  return (
    <div>
   
   <DragDropContext onDragEnd={handleDragEnd}>
      <Button size='small' sx={{textTransform: "none",mt:"10px",ml:"5px",width:"10%"}} variant="contained" onClick={handleClickOpen}>Add Task</Button>
      <Paper elevation={2} sx={{ ml: "5px", mr: "5px", mt: "15px", height: "40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ ml: "10px" }}>Search:</Typography>
        <TextField 
          sx={{
            ml: "5px",
            height: "80%", // Use full height of the Paper for the TextField
            width: "60%",
            "& .MuiOutlinedInput-root": {
              height: "100%", // Ensure the input area uses the full height
              "& input": {
                padding: "0 10px", // Add horizontal padding for the input
                height: "100%", // Ensure input height matches
                boxSizing: "border-box", // Ensures padding doesn't affect total height
              },
            },
          }}
          placeholder='Search..'
        />
      </div>
      <div style={{ display: "flex", alignItems: "center",marginRight:"10px"}}>
        <Typography sx={{whiteSpace: "nowrap"}}>Sort By:</Typography>
        <Select sx={{
              height: "40%", // Set height of the Select component
              width: "30%", // Set width of the Select component
              "& .MuiSelect-select": {
                height: "30%", // Set height for the inner select area
                padding: "0", // Remove default padding
                display: "flex", // Enable flex for centering content
                alignItems: "center", // Center content vertically
              },
              
            // }}
    
        }}
        >
          {/* <MenuItem value=""><em>Recent</em></MenuItem> */}
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
        </Select>
      </div>
    </Paper>
    <Box
      sx={{
        p:"10px",
        display: 'flex',
        flexDirection: 'row',
        height:"100%",
        gap: '15px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flex: 1,
        }}
      >
        <Droppable droppableId='paper1'>
          {(provided)=>(
            <Box sx={{display:"flex",flexDirection:"column",padding:"5px",height:"100%"}}  ref={provided.innerRef}{...provided.droppableProps}>
            <Box sx={{mt:"5px",height:"30px",backgroundColor:"blue",display:"flex",alignItems:"center"}}>
                <Typography sx={{fontSize:"14px",ml:"10px",fontWeight:"bold",color:"white"}} variant="h5">TODO</Typography>
            </Box>
          
            <Box sx={{p:"5px"}}>
             
              {allTasks?.map((item,index)=>(
                
                <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                 
                    {(provided) => (
                      <Box 
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                      >
            <TaskItem title={item.title}
            description={item.description}   
            id={item._id}    
            setInProgress={setInProgress} 
            inProgress={inProgress}  
            index={index}
            handleDeleteItem={handleDeleteItem}
            handleClickOpen={handleClickOpen}
            />
            </Box>
          )}
         </Draggable>
              ))}
            </Box>
            {provided.placeholder}
            </Box>
          )}
        
        </Droppable>
        
      </Paper>

      <Paper
        elevation={3}
        sx={{
          flex: 1,
        }}
      >
        <Droppable droppableId='paper2'>
      
        {(provided)=>(
            <Box sx={{display:"flex",flexDirection:"column",padding:"5px",height:"100%"}}  ref={provided.innerRef}{...provided.droppableProps}>
            <Box sx={{mt:"5px",height:"30px",backgroundColor:"blue",display:"flex",alignItems:"center"}}>
                <Typography sx={{fontSize:"14px",ml:"10px",fontWeight:"bold",color:"white"}} variant="h5">IN PROGRESS</Typography>
            </Box>
          
            <Box sx={{p:"5px"}}>
              {inProgress?.map((item,index)=>(
                <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                {(provided) => (
                  <Box 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
                  >
            <TaskItem title={item.title}
            description={item.description}   
            id={item._id}    
            setInProgress={setInProgress} 
            inProgress={inProgress}
            index={index}  
            disable={true}   
            />
            </Box>
                )}
                </Draggable>
              ))}
            </Box>
            
            </Box>
          )}
        </Droppable>

      </Paper>

      <Paper
        elevation={3}
        sx={{
          flex: 1,
        }}
      >
      <Droppable droppableId='paper3'>
      
      {(provided)=>(
          <Box sx={{display:"flex",flexDirection:"column",padding:"5px",height:"100%"}}  ref={provided.innerRef}{...provided.droppableProps}>
          <Box sx={{mt:"5px",height:"30px",backgroundColor:"blue",display:"flex",alignItems:"center"}}>
              <Typography sx={{fontSize:"14px",ml:"10px",fontWeight:"bold",color:"white"}} variant="h5">COMPLETED</Typography>
          </Box>
        
          <Box sx={{p:"5px"}}>
            {done?.map((item,index)=>(
              <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
              {(provided) => (
                <Box 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
                >
          <TaskItem title={item.title}
          description={item.description}   
          id={item._id}    
          setInProgress={setInProgress} 
          inProgress={inProgress}
          index={index}  
          disable={true}     
          />
          </Box>
              )}
              </Draggable>
            ))}
          </Box>
          
          </Box>
        )}
      </Droppable>
      </Paper>
    </Box>
    <Dialog
    open={open}
    onClose={handleClose}
    >
         <DialogTitle
          id="alert-dialog-title">
          {id ? "Edit Task" : "Add Task"}
        </DialogTitle>
        <DialogContent
        >
          <DialogContentText
           id="alert-dialog-description">
            <Box>
            <Box><Typography>Title</Typography></Box>
            <Box><TextField variant="standard" value={taskDetail.title} onChange={(e)=>{handleTitle(e.target.value)}}></TextField></Box>
        </Box>
        <Box sx={{mt:"15px"}}>
            <Box><Typography>Description</Typography></Box>
            <Box><TextField variant="standard" value={taskDetail.description} onChange={(e)=>{handleDescription(e.target.value)}}></TextField></Box>
        </Box>
            
          </DialogContentText>
        </DialogContent> 
        
        <DialogActions>
          {id ? (<Button variant='contained' size='small'  onClick={()=>handleEdit()}>Edit</Button>):(
            <Button variant='contained' size='small'  onClick={handleSave}>Save</Button>
          )}
          <Button variant='contained' size='small'onClick={handleClose} >
            Cancel
          </Button>
        </DialogActions>
    </Dialog>
    </DragDropContext>
    <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
         message={messageInfo ? messageInfo : "No datas found"}
        action={action}
      />

    </div>

  )
}

export default Tasks
