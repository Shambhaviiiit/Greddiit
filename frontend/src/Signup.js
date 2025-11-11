import Enter from "./Enter";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Signup2 from "./Signup2";

function Signup(props) {

    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    
    let auth = props.auth;
    const [userdata, setUserdata] = useState([]);
    const addUser = () => {
        if (cnfpwd !== pwd) {
            console.log('passwords donot match');
            console.log(cnfpwd);
            console.log(pwd);
            // <p>Two passwords do not match!! Please Try Again.</p>
            return (-1);
        }
        else {

            const data = {
                uname: uname,
                pwd: pwd,
                email: email,
                fname: fname,
                lname: lname,
                contact: contact,
                age: age
            }
            // console.log(uname)
            // console.log(typeof(contact))
            axios.post('http://localhost:5000/new-user', data)
                .then((response) => {
                    console.log('hi....1')
                    console.log(response)
                    setUserdata([response.data, ...userdata])
                })
                .catch((err) => {
                    console.log('hi....2')
                    console.log(err);
                })
            setUname('')
            setEmail('')
            setPwd('')
            setCnfpwd('')
            setContact('')
            setAge('')
            setFname('')
            setLname('')
        }
    }

    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [cnfpwd, setCnfpwd] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [hash, setHash] = useState('');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            let a = addUser();
            if (a === -1) {
                <div>
                    <h3>Passwords do not match! Please try again.</h3>
                    {/* <Signup2 /> */}
                </div>
            }
            else {
                props.setAuth(1);
                auth = 1;
                localStorage.setItem('uname', props.username);
                <Navigate to="/user-page"></Navigate>
            }
        }}>
            <input type="text" class="entry" required id="username" name="username" placeholder="Enter a Username" onChange={(e) => { setUname(e.target.value) }}></input><br></br>
            <input type="text" class="entry" required id="email" name="email" placeholder="Email ID" onChange={(e) => { setEmail(e.target.value) }}></input><br></br>
            <input type="password" class="entry" required id="password" name="password" placeholder="New Password" onChange={(e) => { 
                setHash(bcrypt.hashSync(e.target.value, salt));
                setPwd(hash); 
                }}></input><br></br>
            <input type="password" class="entry" required id="conf_pass" name="conf_pass" placeholder="Confirm Password" onChange={(e) => { 
                if (bcrypt.compareSync(e.target.value, hash)) 
                {
                    console.log('yes');
                    setCnfpwd(pwd);   
                }
                else 
                {
                    var hash2 = bcrypt.hashSync(e.target.value, salt);
                    setCnfpwd(hash2) 
                }

                }}></input><br></br><br></br>
            <input type="text" class="entry" required id="fname" name="fname" placeholder="First Name" onChange={(e) => { setFname(e.target.value) }}></input><br></br>
            <input type="text" class="entry" required id="lname" name="lname" placeholder="Last Name" onChange={(e) => { setLname(e.target.value) }}></input><br></br>
            <input type="text" class="entry" required id="contact" name="contact" placeholder="Contact Number" onChange={(e) => { setContact(Number(e.target.value)) }}></input><br></br>
            <input type="text" class="entry" required id="age" name="age" placeholder="Age" onChange={(e) => { setAge(Number(e.target.value)) }}></input><br></br><br></br><br></br>

            <center><button type="submit" class="submit">Submit</button></center>

        </form>
    );
}

export default Signup;