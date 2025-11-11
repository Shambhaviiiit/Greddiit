import { useState } from "react";
import Enter from "./Enter";
import Signup from "./Signup";
import axios from "axios";
import NoPage2 from "./NoPage2";

function Login(props) {
    
    const bcrypt = require('bcryptjs')
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("B4c0/\/", salt);
    
    const[ret,setRet] = useState(0);
    let auth = props.auth;
    const [username, setUsername] = useState(0)
    const [password, setPassword] = useState(0)
    const [loaded, setLoaded] = useState(0)

    if (props.signup === 1) {
        return (
            <Signup setAuth={props.setAuth} />
        );
    }
    const user_ = (e) => {
        setUsername(e.target.value)
    }
    const pass_ = (e) => {
        setPassword(e.target.value);
        // hash = bcrypt.hashSync(e.target.value, salt);
        // setPassword(hash);
    }

    const check_ = () => {
        const data = {
            username: username,
            password: password
        };
        console.log('here..........1')
        console.log(data);
        axios.post('http://localhost:5000/login', {
            username: username,
            password: password
        })
            .then((response) => {
                console.log("RETURN VALUE")
                if (response.data.ret !== 0) {
                    // props.setProfile(response);
                    localStorage.setItem('uname', username);
                    props.setAuth(1);
                    auth = 1;
                    setLoaded(1);
                    console.log('found details: ');
                    console.log(response);
                    setPassword('');
                    setUsername('');
                    console.log('Auth value: ', auth);
                    setRet(1);
                }
                else {
                    console.log('returning -1');
                    setRet(-1);
                }
            })
            .catch((err) => {
                console.log('ERROR');
                console.log(err);
            })
    }

    if (ret === -1) {
        console.log('if');
        window.location.reload();
    }
    else {
        console.log('else');
        loaded ? (
        <Enter username={username} password={password} auth={auth} setAuth={props.setAuth}></Enter>
        ) : (<h1>Loading</h1>)
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                check_();
                console.log('ret: ', ret);
                if (ret === -1) {
                    console.log('if');
                    <NoPage2 />
                }
                else {
                    console.log('else');
                    <Enter username={username} password={password} auth={auth} setAuth={props.setAuth}></Enter>
                }
            }}>
                <input type="text" className="entry" autoFocus required id="username" name="username" placeholder="Username" onChange={user_}></input><br></br>
                <input type="password" className="entry" required name="password" id="password" placeholder="Password" onChange={pass_}></input><br></br><br></br>
                <center><button type="submit" className="submit" disabled={!password || !username}>Submit</button></center>
                {console.log("Login : ", props.auth)}

            </form>
        </div>
    );
}

export default Login;