import { Link } from "react-router-dom";
export default function Navbar(){
    return(
        <div className="navbar">
          <h1>Demo Project</h1>
          <Link to="/user/add">Create new User</Link>
        </div>
    );
}