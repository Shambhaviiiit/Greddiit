import { useEffect, useState } from "react";
import './Box.css';
import Logout from "./Logout";
import './Profile.css'
import logo from "./user-icon.svg";
import axios from "axios";
import { HighlightOffRounded } from "@mui/icons-material";
import Bar from "./navbar/Bar";
import { Edit } from "@mui/icons-material";
import Popup from "reactjs-popup";

function Profile(props) {

    const [followers, setFollowers] = useState(false);
    const [following, setFollowing] = useState(false);
    const [profile, setProfile] = useState(0);
    const [loaded, setLoaded] = useState(0);
    const [loaded2, setLoaded2] = useState(0);
    const [follower_list, setFollower_list] = useState('');
    const [following_list, setFollowing_list] = useState('');
    const [toDelete, setToDelete] = useState([]);

    
    const [uname, setUname] = useState('');
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [contact, setContact] = useState(0);
    const [age, setAge] = useState(0);



    var todelete = []

    console.log("Profile : ", props.auth)

    const data_name = localStorage.getItem('uname');
    const data = {
        username: data_name
    }
    console.log('data_name ye hai: ', data_name)
    useEffect(() => {
        axios.post('http://localhost:5000/get-profile-data', data)
            .then((response) => {
                setProfile(response);
                setUname(response.data.uname);
                setFname(response.data.fname);
                setLname(response.data.lname);
                setEmail(response.data.email);
                setContact(response.data.contact);
                setAge(response.data.age);
                setLoaded(1);
                console.log(response);
            })
            .catch((err) => {
                console.log('ERROR');
                console.log(err);
            })

        axios.post('http://localhost:5000/get-followers', { uname: data_name })
            .then((response) => {
                console.log('followers ka data');
                console.log(response.data);
                setFollower_list(response.data.followers);
                setFollowing_list(response.data.following);
                setLoaded2(1);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    useEffect(()=>{
        axios.post('http://localhost:5000/remove-follower', {follower:toDelete.follower, following: toDelete.following})
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [toDelete])

    return (
        (loaded && loaded2) ? (
            <>
            {console.log(profile)}
            <Bar page={props.page} setPage={props.setPage} auth={props.auth} setAuth={props.setAuth} flag={props.flag} setFlag={props.setFlag} default={0} />
            <div className="card mb-3">
                <div className="card-body text-center">
                    <img src={logo} alt="Jassa Jas" className="img-fluid rounded-circle mb-2" width="128" height="128" />
                    <h4 className="card-title mb-0"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profile.data.uname} 
                    <Popup trigger={<button className="icon_button"><Edit/></button>} modal nested>
                        {
                            close=>(
                                <div className="new_sub_box">
                                    <form onSubmit={()=>{
                                        axios.post('http://localhost:5000/edit-user-profile', {
                                            uname:uname,
                                            email:email,
                                            fname:fname,
                                            lname:lname,
                                            contact:contact,                                           
                                            age:age
                                       })
                                        .then((res)=>{console.log(res);})
                                        .catch((err)=>{console.log(err);})
                                        close();
                                    }}>
                                    {/* <input type="text" class="entry" id="username" name="username" value={profile.data.uname}onChange={(e) => { setUname(e.target.value) }}></input><br></br> */}
                                    <input type="text" class="entry" id="email" name="email" placeholder={profile.data.email} onChange={(e) => { setEmail(e.target.value) }}></input><br></br>
                                    <input type="text" class="entry" id="fname" name="fname" placeholder={profile.data.fname} onChange={(e) => { setFname(e.target.value) }}></input><br></br>
                                    <input type="text" class="entry" id="lname" name="lname" placeholder={profile.data.lname} onChange={(e) => { setLname(e.target.value) }}></input><br></br>
                                    <input type="text" class="entry" id="contact" name="contact" placeholder={profile.data.contact} onChange={(e) => { setContact(Number(e.target.value)) }}></input><br></br>
                                    <input type="text" class="entry" id="age" name="age" placeholder={profile.data.age} onChange={(e) => { setAge(Number(e.target.value)) }}></input><br></br><br></br><br></br>
                                    <button tyoe="submit">Submit</button>
                                    </form>
                                </div>
                            )
                        }
                    </Popup>
                    </h4>
                    <div className="text-muted mb-2">{profile.data.fname} {profile.data.lname} <br></br>{profile.data.email}<br></br>Age: {profile.data.age} <br /> Contact: {profile.data.contact}</div>
                    
                </div>
                <div>
                    <ul>
                        <li><button className="list_button follow_list_head" onClick={() => setFollowers(!followers)}>Followers</button></li>
                        {followers &&
                        <div>
                            {follower_list.map((c,i)=>{
                                var id = "follower_" + i;
                                return(
                                    <li><button className="list_button follow_list" id={id} >{c}   
                                    <button className="icon_button" onClick={()=>{
                                        // document.getElementById(id).style.visibility = "hidden";
                                        todelete.push({following:c, follower:data_name});
                                        setToDelete({following:c, follower:data_name});
                                        console.log(todelete);
                                        follower_list.splice(i,1);
                                    }}><HighlightOffRounded/></button>
                                    </button></li>
                                    );
                            })}
                        </div>
                        }
                    </ul>
                    <ul>
                        <li><button className="list_button" onClick={() => setFollowing(!following)}>Following</button></li>
                        {following &&
                        <div>
                            {following_list.map((c,i)=>{
                                var id = "following_" + i;
                                return(
                                    <li><button className="list_button follow_list" id={id}>{c}   
                                    <button className="icon_button" onClick={()=>{
                                        // document.getElementById(id).style.visibility = "hidden";
                                        todelete.push({following:c, follower:data_name});
                                        setToDelete({following:c, follower:data_name});
                                        console.log(todelete);
                                        following_list.splice(i,1);
                                        // console.log(c);
                                    }}><HighlightOffRounded/></button>
                                    </button></li>);
                                })}
                        </div>
                        }
                    </ul>
                </div>
                <button className="logout entry" type="submit" onClick={() => { props.setFlag((x) => (1)) }}>Logout</button>
                <Logout flag={props.flag} auth={props.auth} setAuth={props.setAuth}></Logout>
            </div>
            </>
            ) : (<h1>Loading</h1>)    
    );
}

export default Profile;
{/* <div>
<a className="btn btn-phttp://localhost:3000/profile#rimary btn-sm" href="#">Follow</a>
<a className="btn btn-primary btn-sm" href="#">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-square">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg> Message</a>
</div> */}