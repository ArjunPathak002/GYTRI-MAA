import { Link, useNavigate } from "react-router-dom";
import Badege from 'react-bootstrap/Badge';
import { useState } from "react";
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from "./ContextReducer";

export const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  // Initialize data with an empty array as a default value
  const data = useCart() || []; 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 " to="/">
            Food Zone
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
              <Link className="nav-link active fs-5 " aria-current="page" to="/">
                Home
              </Link>
              </li>
              {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
              <Link className="nav-link active fs-5 " aria-current="page" to="/myOrder">
                My orders 
              </Link>
              </li>
           :"" }
            
            </ul>
            {(!localStorage.getItem("authToken")) ?
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/signUp">SignUp</Link>
              </div>
               :<div>
               <button className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</button>
               <button className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                My Cart {" "}
                <Badege pill bg ="danger"> {data.length} </Badege>
                </button> 
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> :null}
               </div>
                }
          </div>
        </div>
      </nav>
    </div>
  );
};
 export default Navbar;