import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();
    console.log("Logout : ", props.auth);
    
    if(props.flag == 1)
    {
        localStorage.clear();
        props.setAuth((x)=>(0));
        console.log("Logged Out : ", props.auth);
        navigate('/');
    }        
}

export default Logout;