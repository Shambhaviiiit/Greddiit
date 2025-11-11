import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import './Box.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Bar from "./navbar/Bar";

function MySubs(props) {

    const navigate = useNavigate();
    const my_data = {
        moderator: localStorage.getItem('uname')
    }
    const [loaded, setLoaded] = useState(0);
    const [my_subs, setMysubs] = useState(null);

    useEffect(() => {
        console.log('asdfasdf');
        axios.post('http://localhost:5000/get-my-subs', my_data)
            .then((res) => {
                console.log('Mere subs mil gaye');
                console.log(res);
                setMysubs(res);
                setLoaded(1);
            })
            .catch((err) => {
                console.log('Error!!');
                console.log(err);
            })
    }, [])

    console.log('These are the subs i retrieved: ', my_subs);
    // console.log(typeof (my_subs));

    const [newname, setNewname] = useState('');
    const [newdesc, setNewdesc] = useState('');
    const [nbanned, setNbanned] = useState(0);
    const [banned, setBanned] = useState([]);

    let count = 1;
    const addBanned = () => {

        setNbanned(nbanned + 1);
        var container = document.getElementById("container");
        console.log(nbanned)
        let i = 1;
        while (i--) {
            
            var input = document.createElement("input");
            input.type = "text";
            input.name = "member" + nbanned;
            input.id = "member" + nbanned;
            input.className = 'entry banned';
            input.placeholder = "Banned Keyword " + (nbanned+1);
            
            container.appendChild(input);
            container.appendChild(document.createElement("br"));
            count++;
            // console.log(banned);
        }
    }

    const store_ = (e) => {
        setNbanned(0);
        // e.preventDefault();
        var i = 0;
        console.log(nbanned);
        // console.log(banned);
        var banned_array = []
        while (i < nbanned) {
            console.log(document.getElementById('member' + i).value)
            banned_array.push(document.getElementById('member' + i).value)
            // setBanned([...banned].);
            // console.log(banned);
            i++;
        }
        const data = {
            moderator: localStorage.getItem('uname'),
            sub_name: newname,
            sub_desc: newdesc,
            sub_banned: banned_array,
            followers: [localStorage.getItem('uname')]
        };
        axios.post('http://localhost:5000/new-sub', data)
            .then((res) => {
                console.log(res);
                // sub_details = res.body;
            })
            .catch((error) => {
                console.log('ERROR');
                console.log(error);
            })
    }

    const delete_ = (c)=>{
        console.log('deleting subgreddiit')
        axios.post('http://localhost/5000/delete-sub', {
            sub_id: c._id,
            sub_name: c.sub_name
        })
            .then((res)=>{console.log(res)})
            .catch((err)=>{console.log(err)})
    }

    return (
        loaded ? (<>
            <Bar page={props.page} setPage={props.setPage} />
            <div style={{paddingLeft:"2%"}}>
                <br/>
            <Popup trigger=
                {<button className="popup_button"> + New Subgreddiit </button>}
                modal nested>
                {
                    close => (
                        <div className="new_sub_box">
                            <h4><center>New Subgreddiit</center></h4>
                            <form onSubmit={(e) => {
                                store_(e)
                                close();
                            }}>
                                <input className='entry' type="text" required name="sub_name" id="sub_name" placeholder="Subgreddiit Name" onChange={(e) => { setNewname(e.target.value) }}></input><br></br>
                                <input className='entry desc' type="text" required name="sub_desc" id="sub_desc" placeholder="Description..." onChange={(e) => { setNewdesc(e.target.value) }}></input><br></br><br></br>
                                <button className='banned_button' width="auto" onClick={(e) => {
                                    e.preventDefault();
                                    addBanned();
                                }}>Add Banned Keywords</button><br></br><br></br>
                                <div id="container"></div>
                                <button type="submit" className="popup_button">Create Subgreddiit</button><br></br><br></br>
                            </form>
                            <div>
                                <button className="popup_button" onClick=
                                    {() => {
                                        close();
                                        count = 1;
                                    }}>
                                    Close
                                </button><br></br>
                            </div>
                        </div>
                    )
                }
            </Popup>
            {Object.values(my_subs.data).map((c) => {
                const path = "/subgreddiit-page/" + c.sub_name;
                return <div>
                    <br></br>
                    <div>
                        <div className="col-12 col-lg-8 col-xl-6 order-1 order-lg-2">
                            <div className="card">
                                <div className="card-body h-100">
                                    <div className="media">
                                        {/* <img src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png" width="56" height="56" className="rounded-circle mr-3" alt="Jassa Jas" /> */}
                                        <div className="media-body">
                                            {/* <small className="float-right text-navy">5m ago</small> */}
                                            {/* <p className="mb-2"><strong>Jassa Jas</strong></p> */}
                                            <button type="submit" className="sub_heading" onClick={() => { navigate(path); }}><h1>{((c).sub_name)}</h1></button><br />
                                            <strong>Moderator : {c.moderator}</strong><br></br>
                                            <hr />
                                            <small>Followers: {c.followers.length}</small><br></br>
                                            <small>Posts: {c.n_posts}</small><br></br>
                                            <small>Banned Keywords: {c.sub_banned}</small><br></br>
                                            {/* <p>Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.</p> */}
                                            <br/><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c.sub_desc}</p>
                                            {/* <small className="text-muted">Today 7:51 pm</small> */}
                                            <button className="popup_button" onClick={()=>{
                                                console.log('deleting subgreddiit')
                                                axios.post('http://localhost:5000/delete-sub', {
                                                    sub_id: c._id,
                                                    sub_name: c.sub_name
                                                })
                                                    .then((res)=>{console.log(res)})
                                                    .catch((err)=>{console.log(err)})
                                            }}>Delete Subgreddiit</button>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}</div>
        </>) : (<h1>Loading</h1>)
    );
}

export default MySubs;

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