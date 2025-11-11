import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import './Box.css'

export default function Post({ c, flag }) {

    console.log('post:');
    console.log(c);
    const [upvotes, setUpvotes] = useState(c.upvotes);
    const [downvotes, setDownvotes] = useState(c.downvotes);
    const [concern, setConcern] = useState('');
    const uname = localStorage.getItem('uname');
    const [comments, setComments] = useState(null);
    const [allcomments, setAllComments] = useState('');
    const [set, setSet] = useState(0);

    
    useEffect(()=>{
        if(comments && flag){
            console.log('addinggggg')
        axios.post('http://localhost:5000/add-comment', {post:c._id, comment:comments})
            .then((res)=>{console.log(res);})
            .catch((err)=>{console.log(err);})
        }    
    }, [set])

    useEffect(()=>{
        if(flag){
        axios.post('http://localhost:5000/get-comments', {post: c._id})
            .then((res)=>{
                console.log(res);
                setAllComments(res.data);
                console.log(allcomments);
            })
            .catch((err)=>{console.log(err);})
        }
    },[])

    return (
        <div className="card">
            <div className="card card-body h-100 media media-body">
                <p className="post-font">{c.text}</p>
                <span>
                    <button className="list-button" onClick={() => {
                        axios.post('http://localhost:5000/upvote', { id: c._id })
                            .then((res) => {
                                console.log(res);
                                setUpvotes(upvotes + 1);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    }>Upvote {upvotes}</button>
                    <button className="list-button" onClick={() => {
                        axios.post('http://localhost:5000/downvote', { id: c._id })
                            .then((res) => {
                                console.log(res);
                                setDownvotes(downvotes + 1);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    }>Downvote {downvotes}</button>
                    <button onClick={() => {
                        axios.post('http://localhost:5000/save-this', { uname: uname, post: c })
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                    }>Save</button>
                    <button onClick={() => {
                        axios.post('http://localhost:5000/follow', { follower: uname, following: c.posted_by })
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }}>Follow</button>

                    <Popup trigger={<button>Report</button>} modal nested>
                        {
                            close => (
                                <div className="new_sub_box">
                                    <form>
                                        <input type="text" placeholder="concern..." onChange={(e) => { setConcern(e.target.value) }}></input>
                                        <button type="submit" onClick={(e) => {
                                            e.preventDefault();
                                            axios.post('http://localhost:5000/report-post', {
                                                sub_name: c.sub_name,
                                                reported_by: uname,
                                                reported_user: c.true_posted_by,
                                                concern: concern,
                                                post_text: c.text,
                                                post_id: c._id
                                            })
                                                .then((res) => {
                                                    console.log(res);
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                })
                                        }}>Submit</button>
                                    </form>
                                    <button onClick={() => {
                                        close();
                                    }}>Close</button>
                                </div>
                            )
                        }
                    </Popup>

                    {/* <button onClick={()=>{
                        axios.post('http://localhost:5000/report-post', {
                            reported_by: uname,
                            reported_user: c.posted_by,
                            concern: concern,
                            post_text: c.text
                        })
                        .then((res)=>{
                            console.log(res);
                        })
                        .catch((err)=>{
                            console.log(err);
                        })
                    }}>Report</button> */}

                </span>
                <br></br>
                <span>
                    {(flag)?(
                <Popup trigger={<button>Comment</button>} modal nested>
                    {
                        close=>(
                            <span>
                                <div className="new_sub_box">
                                    <form>
                                        <input required type="text" placeholder="comment.." className="entry desc" onChange={(e)=>{setComments((e.target.value))}}></input>
                                        <button display="inline" className="popup_button" type="submit" onClick={(e)=>{
                                            // e.preventDefault();
                                            console.log('i am sending this to backend: ');
                                            console.log(comments);
                                            setSet(set + 1);
                                        }
                                        }>Post</button>
                                    </form>
                                    <span>
                                    <button display="inline" onClick={() => {
                                        close();
                                    }}>Close</button>
                                    </span>
                                </div>
                            </span>
                        )
                    }
                </Popup>):(<></>)}
                </span>
                <div className="card">
                    {(flag)?(<>
                    {Object.values(allcomments).map((c,i)=>{
                        return(
                            <div className="card card-body">
                                <p>{c}</p>
                            </div>
                        );
                    })}</>):(<></>)}
                </div>
                <small>
                    Posted By: {c.posted_by}
                </small>
                <br></br>
            </div>
        </div>
    );
}