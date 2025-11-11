import { useNavigate } from "react-router-dom";

function Enter(props) {
    console.log("Enter ", props.auth);
    const navigate = useNavigate();     

    if(props.username === "admin" && props.password === "admin")
    {
        localStorage.setItem('uname', props.username);
        props.setAuth(1);
        {console.log("Entered : ", props.auth)}
        navigate("/user-page");
    }
    
    else if(props.auth===1)
    {
        localStorage.setItem('uname', props.username);
        navigate("/user-page");
    }
    
    else
    {
        {console.log("Wrong credentials(Enter) : ", props.auth)}
    }
}

export default Enter;