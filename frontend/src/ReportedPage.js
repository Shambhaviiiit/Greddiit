import axios from "axios";
import { useState, useEffect } from "react";

export default function ReportedPage(props) {

    const [reports, setReports] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [ignored, setIgnored] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const [toedit, setToedit] = useState('');
    const [post_id, setPost_id] = useState('');
    const [toDelete, setToDelete] = useState([]);
    const [flag, setFlag] = useState(false);
    // var x = false;
    // const [x, setX] = useState(false);

    var todelete = []

    useEffect(()=>{
        axios.post('http://localhost:5000/get-reports', {
            sub_name: props.sub_name
        })
            .then((res)=>{
                console.log(res);
                setReports(res.data);
                setIgnored(reports.ignored);
                setLoaded(1);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[]);

    useEffect(()=>{
        // console.log(x, ignored);
        if(loaded){
        axios.post('http://localhost:5000/edit-report', {
            id: toedit,
            blocked: blocked,
            ignored: ignored,
            post_id: post_id
        })
            .then((response)=>{
                console.log(response);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [flag])

    useEffect(()=>{
        if(loaded){
        axios.post('http://localhost:5000/remove-post', {
            text: toDelete
        })
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }    
    }, [toDelete])

    return(
        (loaded) ? (
            <div>
                {Object.values(reports).map((c,i)=>{
                    return(
                        <div className="card card-body">
                            <h4>Report : {c.concern}</h4>
                            <small>Reported By: {c.reported_by}</small><br></br>
                            <div className="card card-body">
                            <h5>{c.reported_user}</h5>
                            <span className="post-font">{c.post_text}</span>
                            <span>
                            <button disabled={c.ignored} onClick={()=>{
                                setBlocked(true);
                                setToedit(c._id);
                                setPost_id(c.post_id);
                                setFlag(true);
                            }}>Block</button>
                            <button disabled={c.ignored} onClick={()=>{
                                todelete.push({post: c.post_text})
                                setToDelete({post: c.post_text})
                                console.log('see this')
                                console.log(toDelete)
                                reports.splice(i,1);
                            }}>Delete</button>
                            <button onClick={()=>{
                                setIgnored(true);
                                setToedit(c._id);
                                setPost_id(c.post_id);
                                setFlag(true);
                            }}>Ignore</button>
                            </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (<p>Loading</p>)
    );
}