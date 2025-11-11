import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Saved from './Saved';
import Bar from './navbar/Bar';
import Search from './Search';
import './Box.css'

function Subgreddits(props) {

    const navigate = useNavigate();
    console.log('page value in Subgreddits', props.page);
    const [loaded, setLoaded] = useState(0);
    const [subs, setSubs] = useState({});
    const [tosearch, setTosearch] = useState('')
    const [sort, setSort] = useState('none');
    // const [flag, setFlag] = useState(0);
    // const [x, setX] = useState(false);

    const my_data = { search_by: tosearch }
    useEffect(() => {
        axios.post('http://localhost:5000/get-all-subs', my_data)
            .then((res) => {
                console.log('Received all subs');
                console.log(res.data);
                setSubs(res.data);
                setLoaded(1);
                // setX(true);
            })
            .catch((err) => {
                console.log('Error!!');
                console.log(err);
            })
    }, [tosearch])
    if (props.page === 'profile') {
        // return (
        //     <Profile auth={props.auth} setAuth={props.setAuth} flag={props.flag} setFlag={props.setFlag} />
        // );
        navigate('/profile');
    }

    else if (props.page === 'mysubs') {
        console.log("Well I am here");
        // return (
        //     <MySubs />
        // );
        navigate('/mysubs')
    }

    else if (props.page === 'saved') {
        console.log('Saved Posts');
        // return (
        //     <Saved />
        // );
        navigate('/saved')
    }

    // useEffect(() => {
    //     if (sort === 'name(ascending)') {
    //         axios.post('http://localhost:5000/sort-name-asc', {})
    //             .then((res) => { console.log(res) })
    //             .catch((err) => { console.log(err) })

    //         window.location.reload();
    //     }
    //     else if (sort === 'name(descending)') {
    //         axios.post('http://localhost:5000/sort-name-desc', {})
    //             .then((res) => { console.log(res) })
    //             .catch((err) => { console.log(err) })

    //         window.location.reload();
    //     }
    //     else if (sort === 'creation date') {
    //         axios.post('http://localhost:5000/sort-date', {})
    //             .then((res) => { console.log(res) })
    //             .catch((err) => { console.log(err) })

    //         window.location.reload();
    //     }
    //     else if (sort === 'followers') {
    //         axios.post('http://localhost:5000/sort-followers', {})
    //             .then((res) => { console.log(res) })
    //             .catch((err) => { console.log(err) })

    //         window.location.reload();
    //     }
    // }, [sort])

    useEffect(() => {
        if (sort === 'name(ascending)') {
            console.log('a');
            console.log(subs);
            setSubs([...subs].sort((a, b) => a.sub_name.localeCompare(b.sub_name)));
            // setLoaded(0);
            // setFlag(flag+1);
        }

        else if (sort === 'name(descending)') {
            setSubs([...subs].sort((b,a) => a.sub_name.localeCompare(b.sub_name)));
            // setLoaded(0);
            // setFlag(flag+1);
        }

        else if (sort === 'creation date') {
            setSubs([...subs].sort((a, b) => a.createdAt > b.createdAt ? 1:-1));
            // setLoaded(0);
            // setFlag(flag+1);
        }

        else if (sort === 'followers') {
            setSubs([...subs].sort((a, b) => a.followers.length > b.followers.length ? 1:-1));
            // setLoaded(0);
            // setFlag(flag+1);
        }
    }, [sort])

    // useEffect(()=>{
    //     if(x){
    //     setLoaded(1);
    //     }
    // }, [flag])

    return (
        loaded ? (
            <>
                <Bar page={props.page} setPage={props.setPage} />
                <br />
                <div style={{paddingLeft:"2%"}}>
                <Search setTosearch={setTosearch} />
                <br/>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSort(document.getElementById('sort').value)
                        // .then((response)=>{console.log(response);})
                        // .catch((err)=>{console.log(err);})
                    
                }}>
                    <label for="sort">Sort By: &nbsp;&nbsp;</label>
                    <select name="sort" id="sort">
                        <option className="dropdown" value="none">None</option>
                        <option className="dropdown" value="name(ascending)">Name(Ascending)</option>
                        <option className="dropdown" value="name(descending)">Name(Descending)</option>
                        <option className="dropdown" value="creation date">Creation Date</option>
                        <option className="dropdown" value="followers">Followers</option>
                    </select>
                    <span>&nbsp;&nbsp;</span>
                    <button type="submit">Submit</button>
                </form>
                </div>
                <br />
                {Object.values(subs).map((c,i) => {
                    const path = "/subgreddiit-page/" + c.sub_name;
                    return (
                        <div style={{paddingLeft:"2%"}}>
                        <div className="col-12 col-lg-8 col-xl-6 order-1 order-lg-2">
                            <div className="card">
                                <div className="card-body h-100">
                                    <div className="media">
                                        {/* <img src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png" width="56" height="56" className="rounded-circle mr-3" alt="Jassa Jas" /> */}
                                        <div className="media-body">
                                            {/* <small className="float-right text-navy">5m ago</small> */}
                                            {/* <p className="mb-2"><strong>Jassa Jas</strong></p> */}
                                            <button className="sub_heading" onClick={() => {
                                                navigate(path);
                                            }}><h1>{((c).sub_name)}</h1></button><br />
                                            <strong>Moderator : {c.moderator}</strong><br></br>
                                            <hr />
                                            <small>Followers: {c.followers.length}</small><br></br>
                                            <small>Posts: {c.n_posts}</small><br></br>
                                            <small>Banned Keywords: {c.sub_banned}</small><br></br>
                                            {/* <p>Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.</p> */}
                                            <br />
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c.sub_desc}</p>
                                            {/* <small className="text-muted">Today 7:51 pm</small> */}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                })}
            </>
        ) : (<h1>Loading</h1>)
    );
}

export default Subgreddits;
{/* <div className="media">
        <div className="media-body">
            <small className="float-right text-navy">3h ago</small>
            <p className="mb-2"><strong>John Smith</strong></p>
            <img src="https://therichpost.com/wp-content/uploads/2021/03/avatar2.png" className="img-fluid" alt="Unsplash" />
            <small className="text-muted">Today 5:12 pm</small>
            <br />
        </div>
    </div>
    <hr /> */}