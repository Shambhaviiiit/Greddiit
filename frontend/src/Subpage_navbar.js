import "navbar/Navbar.css"
import logo from "./Reddit_logo_new.svg.png"
import { useState } from "react";
import { useParams } from "react-router-dom";

function Subpage_navbar(props) {
    const [section, setSection] = useState('');
    const sub_name = useParams();

    const users_ = () => {
        setSection('users')
    }
    return(
        <div>
        <p className="logo_2"><img src={logo} className="logo"></img></p>
        
    <div className="bar">
        <button className="nav_button" id="Home" onClick={saved_}>SAVED</button>
        <button className="nav_button" id="Users" onClick={profile_}>MY PROFILE</button>
        <button className="nav_button" id="Reported Posts"onClick={mysubs_}>MY SUBS</button>
        <button className="nav_button" id="Joining Requests" onClick={subgreddits_}>SUBGREDDITS</button>
    </div>
    {/* <Subgreddits profile={props.profile} setProfile={props.setProfile} auth={props.auth} setAuth={props.setAuth} flag={flag} setFlag={setFlag} page={page}/> */}
    </div>
    );
}

export default Subpage_navbar;