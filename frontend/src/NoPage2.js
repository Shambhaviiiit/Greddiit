import { Navigate } from "react-router-dom";
function NoPage2(props){
    {console.log('NoPage2 auth: ',props.auth)}
    return(
        <div>
            <p>Incorrect Login Credentials! </p>
            {console.log('Invalid Credentials!')}
            <Navigate to="/" />
        </div>
    );
}

export default NoPage2;