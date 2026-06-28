import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from './nav';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
export default function CreateUser(){
    const navigate=useNavigate();
    const [data,setData]=useState({name:"",email:"",phone:""});
    const [err,setErr]=useState("");
    function handleChange(event){
       setData((prevData)=>{
        return {...prevData,[event.target.name]:event.target.value}
       });
    }

   async function handleSubmit(event){
    event.preventDefault();
    try{
       let res=await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if(!res.ok) throw new Error("SOme error occurred");
      navigate("/");
    }catch(err){
     setErr(err.message);
    }
   
    }

    return(
        <>
            <Navbar/>
        <div className='formCont'>
           
            <form className='newUserForm' onSubmit={handleSubmit}>
                <h2>Add new User</h2>
              <TextField fullWidth id="outlined-basic" onChange={handleChange} name='name' label="Name" value={data.name} required variant="outlined" />
              <br></br> <br></br>
              <TextField fullWidth id="outlined-basic" onChange={handleChange} label="Email" name="email" value={data.email} required variant="outlined" />
              <br></br> <br></br>
              <TextField fullWidth id="outlined-basic" onChange={handleChange} label="Phone" name='phone' value={data.phone} required variant="outlined" />
              <br></br> <br></br>
              <Button fullWidth variant="contained" type='submit'>Add</Button>
            </form>
            {err? <p>{err}</p>:""}
        </div>
        </>
       
    )
}