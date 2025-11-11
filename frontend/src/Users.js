import { useState, useEffect } from "react";
import axios from "axios";

export default function Users (props) {
    const sub_id = props.sub_id;
    const [users, setUsers] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        axios.post('http://localhost:5000/get-users-list', {sub_id: sub_id})
            .then((response)=>{
                console.log(response.data);
                setUsers(response.data);
                setLoaded(true);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])

    return(
        (loaded) ? (
            <div>
                {console.log(users)}
                {users.map((c,i)=>{
                    return(
                    <p>{i+1}. {c}</p>
                    );
                })}
            </div>
        ) : (<p>Loading</p>)
    );
}