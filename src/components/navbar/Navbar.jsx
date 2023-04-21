import "./navbar.css"
import travel from '../asset/travel.png';
import {Link}  from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
      <div className="logo-container">
      <Link to="/" className="linkList">
      <img src={travel} className="logo" alt="My Logo"/>
    
    </Link>
    
  </div>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>

        </div>
      </div>
    </div>
  )
}

export default Navbar