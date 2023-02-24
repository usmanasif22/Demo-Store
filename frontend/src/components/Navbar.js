import logo from '../images/logo.png';
const Navbar = () => {
    return (  
        <div className="navbar">
            <img src={logo} alt="sitelogo" />
            <ul className="nav-links">
                <li>Expert Sourcing</li>
                <li>Contract Manufacturing</li>
                <li style={{color:"#57B4D9"}}>Buy</li>
                <li>Financing</li>
                <li>About Us<span><img id="dropdown" src="https://thebuyhive.com/buy/img/chevronDown.e08abe09.svg" alt="" /></span></li>
            </ul>
            <div className="buttonContainer">
                <button id="registerBtn">Register</button>
            <button id="signinBtn"><img id="signin" src="https://thebuyhive.com/buy/img/user.fe2d5af3.svg" alt="signinlogo"></img>Sign In</button>
            <span><svg id="cart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#81d2ab"></path> </svg></span>
            </div>
   
        </div>
    );
}
 
export default Navbar;