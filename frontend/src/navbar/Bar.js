import "./Navbar.css"
import logo from "./Reddit_logo_new.svg.png"
import Subgreddits from "../Home"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle,Description,Collections,TurnedIn } from "@mui/icons-material";

function Bar(props) {

    const navigate = useNavigate();
    

    useEffect(()=>{
        console.log('using effect');
        if(props.page==='profile')
        {
            profile_();
            navigate('/profile');
        }

        else if(props.page==='Subgreddits')  
        {
            subgreddits_();
            navigate('/user-page'); 
        }

        else if(props.page==='mysubs')
        {
            mysubs_();
            navigate('/mysubs');
        }

        else if(props.page==='saved')
        {
            saved_();
            navigate('/saved');
        }

    }, [props.page])

    const profile_ = () => {
        // props.setPage('profile');
        document.getElementById('profile').style.borderBottomColor = "rgb(232,42,74)";
        document.getElementById('subs').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('my_subs').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('saved').style.borderBottomColor = "rgb(38, 36, 37)";
    }
    const subgreddits_ = () => {
        // props.setPage('Subgreddits');
        document.getElementById('subs').style.borderBottomColor = "rgb(232,42,74)";
        document.getElementById('profile').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('my_subs').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('saved').style.borderBottomColor = "rgb(38, 36, 37)";
    }
    const mysubs_ = () => {
        // props.setPage('mysubs');
        document.getElementById('my_subs').style.borderBottomColor = "rgb(232,42,74)";
        document.getElementById('subs').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('profile').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('saved').style.borderBottomColor = "rgb(38, 36, 37)";
    }

    const saved_ = () => {
        // props.setPage('saved');
        document.getElementById('saved').style.borderBottomColor = "rgb(232,42,74)";
        document.getElementById('subs').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('my_subs').style.borderBottomColor = "rgb(38, 36, 37)";
        document.getElementById('profile').style.borderBottomColor = "rgb(38, 36, 37)";
    }

    return(
        <div>
        <span className="heading">g</span><span className="logo_2"><img src={logo} className="logo"></img></span>
        
    <div className="bar">
        <button className="nav_button" id="profile" onClick={()=>{
            props.setPage('profile');
            profile_();
            }}><AccountCircle/> MY PROFILE</button>
        <button className="nav_button" id="my_subs" onClick={()=>{
            props.setPage('mysubs');
            mysubs_();
            }}><Description/> MY SUBS</button>
        <button className="nav_button" id="subs" onClick={()=>{
            props.setPage('Subgreddits');
            subgreddits_();
            }}><Collections/> SUBGREDDITS</button>
        <button className="nav_button" id="saved" onClick={()=>{
            props.setPage('saved');
            saved_();
            }}><TurnedIn/> SAVED</button>
    </div>

    {/* {(props.default) ? (<Subgreddits auth={props.auth} setAuth={props.setAuth} flag={props.flag} setFlag={props.setFlag} page={page}/>) : (<></>)} */}
    </div>
    );
}

export default Bar;