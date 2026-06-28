import {useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import Navbar from "./nav";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EditUser(){
    const [data,setData]=useState({name:"",email:"",phone:""});
    const [err,setErr]=useState("");
   const {id}=useParams();
   const navigate=useNavigate();

     useEffect(()=>{
        async function loadUser(){
            try{
                let response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if(!response.ok) throw new Error("Unable to find this user");
                let res=await response.json();
                setData({
                    name:res.name,email:res.email,phone:res.phone
                });
            }catch(err){
                setErr(err.message);
            }
        }
        loadUser();
     },[id]);

    function handleChange(event){
        setData((prevData)=>{
         return {...prevData,[event.target.name]:event.target.value}
        });
     }

     async function handleSubmit(event){
        event.preventDefault();
        try{
           let res=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
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
            <h2>Edit User</h2>
          <TextField fullWidth id="outlined-basic" onChange={handleChange} name='name' label="Name" value={data.name} required variant="outlined" />
          <br></br> <br></br>
          <TextField fullWidth id="outlined-basic" onChange={handleChange} label="Email" name="email" value={data.email} required variant="outlined" />
          <br></br> <br></br>
          <TextField fullWidth id="outlined-basic" onChange={handleChange} label="Phone" name='phone' value={data.phone} required variant="outlined" />
          <br></br> <br></br>
          <Button fullWidth variant="contained" type='submit'>Edit</Button>
        </form>
        {err? <p>{err}</p>:""}
    </div>
    </>
    )
}