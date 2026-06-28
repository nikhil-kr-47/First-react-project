import Navbar from "./nav.jsx";
import {useEffect,useState} from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Users(){
    const [users,setUsers]=useState([]);
    const [err,setErr]=useState("");
    const [isLoading,setIsLoading]=useState(true);
    const navigate=useNavigate();


   async function getUsers(){
    
       let users=await fetch("https://jsonplaceholder.typicode.com/users");
       if(!users.ok) throw new Error("Request falied");
       return users.json();
    
     }

     function handleEdit(id){
        navigate(`/user/edit/${id}`);
     }

    async function handleDlt(id){
        try{
        let res=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
          });
          if(!res.ok) throw new Error("Can't delete");
          setUsers((prevUsers)=>{
            return prevUsers.filter(us=>us.id!==id);
          })
        }catch(err){
            setErr(err.message);
        }
     }
    

    useEffect(()=>{
        async function loadUsers(){
            try{
              let user=await getUsers();
              setUsers(user);
            }catch(err){
                setErr("Couldn't fetch usersm Try again");
            }finally{
                setIsLoading(false);
            }
        }
        loadUsers();
    },[]);

   
    return(
        <div>
            <Navbar/>
            <table className="userTable">
                <caption  className="tableCaption">Users</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                       <th>Email</th>
                       <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(us=>{
                      return <tr key={us.id} className="tableRow">
                        <td>{us.name}</td>
                        <td>{us.email}</td>
                        <td>{us.phone}</td>
                        <td> <Button variant="outlined" onClick={()=>handleEdit(us.id)}>Edit</Button></td>
                        <td> <Button variant="outlined" onClick={()=>handleDlt(us.id)}>Delete</Button></td>
                      </tr>
                    })}
                </tbody>
            </table>
            {isLoading && <p className="statusMessage">Loading...</p>}
            {err && <p className="statusMessage errorMessage">{err}</p>}
        </div>
    )
}