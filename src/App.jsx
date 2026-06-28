import { Routes,BrowserRouter,Route } from "react-router-dom"
import './App.css'
import EditUser from "./editUser";
import Users from './usersTable';
import CreateUser from "./newUserForm";
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Users/>}></Route>
      <Route path="/user/add" element={<CreateUser/>}></Route>
      <Route path="/user/edit/:id" element={<EditUser/>}></Route>
    </Routes>
    </BrowserRouter>
   
  )
     
}

export default App
