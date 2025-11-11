import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";
import Bar from "./navbar/Bar";

export default function Saved(props) {

    const [saved_posts, setSaved_posts] = useState('');
    const [loaded, setLoaded] = useState(false);
    const uname = localStorage.getItem('uname');
    useEffect(() => {
        axios.post('http://localhost:5000/saved-lao', {
            uname: uname
        })
            .then((res) => {
                console.log(res);
                setSaved_posts(res.data.ids);
                setLoaded(true);

            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const [loaded1, setLoaded1] = useState(false);
    const [posts, setPosts] = useState({})
    // const [post, setPost] = useState('');
    // const x = saved_posts.length();
    // console.log(saved_posts);

    useEffect(() => {
        var temp = []
        Object.values(saved_posts).map((c) => {
            axios.post('http://localhost:5000/get-post', { id: c })
                .then((res) => {
                    console.log(res.data);
                    temp.push(res.data);
                    console.log('array mei pushed')
                    console.log(temp)
                })
        })
        setPosts(temp);
        setLoaded1(true);
    }, [loaded])

    // setPost(res.data);
    loaded1 ? (console.log(posts)) : (console.log('2'))
    loaded ? (console.log('1')) : (console.log('2'))
    return (
        (loaded && loaded1) ? (
            <>
            {console.log(posts, loaded, loaded1)}
            <Bar page={props.page} setPage={props.setPage}/>
            <div>
                <p>Hi</p>
                {Object.values(posts).map((p,i) => {
                    console.log('Hi');
                    console.log(p);
                    return (<Post key={i} c={p} />);
                })}
            </div>
            </>
        ) : (<p>Loading</p>)
    );
}
                    // (loaded) ? (
                    //     <div>
                    //         {(saved_posts).map((c) => {
                    //             axios.post('http://localhost:5000/get-post', { id: c })
                    //                 .then((res) => {
                    //                     console.log(res.data);
                    //                     setPost(res.data);
                    //                     setLoaded1(1);
                    //                 })
                    //             return (
                    //                 (loaded1===x) ? (
                    //                     <Post c={post}></Post>
                    //                 ) : (<p>Loading2</p>)
                    //             );
                    //         })}
                    //     </div>
                    // ) : (<p>Loading</p>)