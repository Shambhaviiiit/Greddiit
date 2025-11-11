import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import './Box.css'
import './navbar/Navbar.css'
import logo from "./Reddit_logo_new.svg.png"
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { HomeRounded } from "@mui/icons-material";
import ReportedPage from "./ReportedPage";
import Users from "./Users";
import Bar from "./navbar/Bar";
import RandomImage from "./RandomImage";

function Subpage() {

    console.log('Hi');
    const navigate = useNavigate();
    const { sub_name } = useParams();
    const [loaded1, setLoaded1] = useState(0);
    const [loaded2, setLoaded2] = useState(0);
    const [sub_details, setSub_details] = useState('');
    const [post, setPost] = useState('')
    const [allposts, setAllposts] = useState(0);
    const uname = localStorage.getItem('uname');
    const [section, setSection] = useState('posts');
    const [joined, setJoined] = useState(false);
    var flag = false;

    const users_ = () => {
        setSection('users')
    }
    const reported_ = () => {
        setSection('reported')
    }
    const requests_ = () => {
        setSection('requests')
    }
    const posts_ = () => {
        setSection('posts')
    }
    const stats_ = () => {
        setSection('stats')
    }

    const store_ = (e) => {
        console.log('Storing Data');
        console.log(post);
        const data = {
            posted_by: localStorage.getItem('uname'),
            sub_name: sub_name,
            post: post,
            true_posted_by: localStorage.getItem('uname')
        };
        axios.post('http://localhost:5000/new-post', data)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log('ERROR');
                console.log(error);
            })

    }

    const join_ = () => {
        const sub_name_ = {
            sub_name: sub_name,
            uname: uname
        }
        console.log('sent request:')
        console.log(sub_name_)
        axios.post('http://localhost:5000/request-join', sub_name_)
            .then((res) => {
                console.log(res);
                window.location.reload()
                // console.log(sub_details)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    useEffect(() => {
        console.log(sub_name);
        const data = {
            sub_name: sub_name
        }
        axios.post('http://localhost:5000/subpage', data)
            .then((res) => {
                console.log('Sub details received:');
                console.log(res);
                setSub_details(res.data);
                setLoaded1(1);
                
                if((sub_details.followers).includes(uname))
                {
                    setJoined(true);
                }
            })
            .catch((err) => {
                console.log('Error getting sub details');
                console.log(err);
            })

        axios.post('http://localhost:5000/sub-posts', data)
            .then((res) => {
                console.log('Posts received:');
                console.log(res);
                setAllposts(res);
                setLoaded2(1);
            })
            .catch((err) => {
                console.log('Some error');
                console.log(err);
            })

    }, [])

    console.log(loaded1, loaded2)
    return (
        <div>
            <div margin-left="40%">
                <div>
                    <p className="logo_2"><img src={logo} className="logo"></img></p>

                    <div className="bar">
                        <button className="nav_button back_button" id="back" onClick={()=>{navigate('/user-page');}}><HomeRounded /></button>
                        <button className="nav_button" id="Home" onClick={posts_}>POSTS</button>
                        <button className="nav_button" id="Users" onClick={users_}>USERS</button>
                        
                        {(loaded1&&(sub_details.moderator === uname)) ? (<>
                        <button className="nav_button" id="Reported Posts" onClick={reported_} >REPORTED PAGE</button>
                        <button className="nav_button" id="Stats" onClick={stats_}>STATS</button>
                        <button className="nav_button" id="Joining Requests" onClick={requests_} >JOINING REQUESTS</button>
                        </>) : (<>{console.log(loaded1, sub_details.moderator, uname)}</>)}
                    </div>
                </div>
                {(section === 'posts') ? (
                    (loaded1 && loaded2) ? (
                        <div>
                            <table><tr><td>
                                <br/>
                            <div className="image-class">
                                <RandomImage />
                            </div><br/></td>
                            <td className="margining">
                            {console.log(uname, sub_details.moderator)}
                            <br></br>
                            <h1>{sub_details.sub_name}</h1>
                            <strong>Moderator: {sub_details.moderator}</strong><br></br>
                            <small>Followers: {sub_details.followers.length + 1}</small><br></br>
                            <small>Posts: {allposts.data.length }</small><br></br>
                            {/* <small>Banned Keywords: {sub_details.sub_banned}</small><br></br> */}
                            <small>Banned Keywords : {sub_details.sub_banned.map((c,i)=>{return(<> {c}, </>)})}</small><br></br>
                            </td></tr></table>
                            <div style={{paddingLeft:"2%"}}>
                            <div className="card card-body h-100 media media-body " style={{paddingLeft:"2%"}}>
                                <p>{sub_details.sub_desc}</p>
                                <hr />
                                <span>
                                    {(joined || (uname === sub_details.moderator)) ? (
                                        <>
                                    <Popup trigger=
                                        {<button className="popup_button"> + New Post </button>}
                                        modal nested>
                                        {
                                            close => (
                                                <div class="new_sub_box">
                                                    <h4><center>New Subgreddiit</center></h4>
                                                    <form onSubmit={store_}>
                                                        <input className='entry' type="text" required name="post" id="post" placeholder="Post.." onChange={(e) => { setPost(e.target.value) }}></input><br></br><br></br>
                                                        <div id="container"></div>
                                                        <button type="submit" className="popup_button">Create Post</button><br></br><br></br>
                                                    </form>
                                                    <div>
                                                        <button className="popup_button" onClick=
                                                            {() => close()}>
                                                            Close
                                                        </button><br></br>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Popup>
                                    {/* <br></br><br></br> */}
                                    </>
                                    ) : (<></>)}
                                    {((uname === sub_details.moderator) || (joined)) ? (
                                        <ul>
                                            {console.log(sub_details)}
                                            
                                        </ul>
                                    ) : (<button className="join" onClick={join_}>Join Subgreddiit</button>)}



                                    <div>
                                        <ul className="list-button"></ul>
                                    </div>
                                </span>
                            </div>
                            <h1>Posts</h1>
                            {Object.values(allposts.data).map((c) => {

                                return (
                                    // <div className="card">
                                    //     <div className="card card-body h-100 media media-body">
                                    //         <p>{c.text}</p>
                                    //         <small>Posted By: {c.posted_by}</small>
                                    //         <span>
                                    //             <button className="list-button" onClick={() => {
                                    //                 axios.post('http://localhost:5000/upvote', { id: c._id })
                                    //                     .then((res) => {
                                    //                         console.log(res);
                                    //                         setUpvotes(upvotes + 1);
                                    //                     })
                                    //                     .catch((err) => {
                                    //                         console.log(err);
                                    //                     })
                                    //             }
                                    //             }>Upvote {upvotes}</button>
                                    //             <button className="list-button" onClick={() => {
                                    //                 axios.post('http://localhost:5000/downvote', { id: c._id })
                                    //                     .then((res) => {
                                    //                         console.log(res);
                                    //                         setDownvotes(downvotes + 1);
                                    //                     })
                                    //                     .catch((err) => {
                                    //                         console.log(err);
                                    //                     })
                                    //             }
                                    //             }>Downvote {c.downvotes}</button>
                                    //         </span>
                                    //         <br></br>
                                    //     </div>
                                    // </div>\
                                    <Post c={c} flag={true}></Post>
                                );
                            })}
                            </div>
                        </div>
                    ) : (<p>Loading</p>)
                ) : (
                    (section === 'requests') ? (
                        <div>
                            <h1>Requests</h1>
                            {Object.values(sub_details.requests).map((c,i) => {
                                return (
                                    <ul>
                                        <li className="list_button">{c}  <span><button onClick={() => {
                                            axios.post('http://localhost:5000/accept-request', {
                                                sub_name: sub_details.sub_name,
                                                uname: c
                                            })
                                                .then((res) => {
                                                    console.log(res);
                                                    (sub_details.requests).splice(i,1);
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        }}>Accept</button>
                                            <button onClick={() => {
                                                axios.post('http://localhost:5000/reject-request', {
                                                    sub_name: sub_details.sub_name,
                                                    uname: c
                                                })
                                                    .then((res) => {
                                                        console.log(res);
                                                        (sub_details.requests).splice(i,1);
                                                        console.log('removed')
                                                        console.log(sub_details.requests)
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    })
                                            }}>Reject</button></span></li>
                                    </ul>
                                );
                            })}
                            <br/><br/>
                        </div>
                    ) : (
                        (section === 'users') ? (
                            <div><h1>Users</h1><Users sub_id={sub_details._id}/></div>
                        ) : (
                            (section === 'stats') ? (
                                <div><h1>Stats</h1></div>
                            ) : (<div><br></br><h1>Reports</h1><br></br><ReportedPage sub_name={sub_name}/></div>)
                        )
                    )
                )}
            </div>
        </div >
    );
}

export default Subpage;

