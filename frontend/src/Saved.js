import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import Bar from "./navbar/Bar";

function Saved(props) {

    const [saved_posts, setSaved_posts] = useState({});
    const [loaded, setLoaded] = useState(false);
    const uname = localStorage.getItem('uname');
    const [toRemove, setToRemove] = useState([]);
    const [x,setX] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:5000/saved-lao', {
            uname: uname
        })
            .then((res) => {
                console.log(res);
                if(res.data)
                {
                    console.log('ye le');
                    setSaved_posts(res.data);
                }    
                
                else{
                    setSaved_posts({ids: []});
                }

                setLoaded(true);
                setX(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    useEffect(()=>{
        if(x){
        axios.post('http://localhost:5000/remove-saved-post', {
            uname:toRemove.uname, post:toRemove.post
        })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }    
    }, [toRemove])

    return (
        (loaded) ? (
            <>
                {console.log(loaded, saved_posts)}
                <Bar page={props.page} setPage={props.setPage} />
                <div>
                    {Object.values(saved_posts.ids).map((p, i) => {
                        return (
                            <>
                                <Post key={i} c={p} flag={true}/>
                                <button onClick={()=>{
                                    setToRemove({uname: uname, post: p});
                                }}>Remove</button>
                            </>
                        );
                    })}
                </div>
            </>
        ) : (<p>Loading</p>)
    );
}

export default Saved;