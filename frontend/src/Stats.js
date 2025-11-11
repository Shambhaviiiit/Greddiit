import { useState, useEffect, useParams } from "react";

export default function Stats() {

    // Number of daily posts vs date
    const [loaded, setLoaded] = useState(false);
    const [allposts, setAllposts] = useState([]);
    const [days, setDays] = useState('');
    const {sub_name} = useParams();

    useEffect(()=>{

        axios.post('http://localhost:5000/sub-posts-per-day', {sub_name: sub_name})
            .then((res) => {
                console.log('Posts per day:');
                console.log(res.data);
                // setAllposts(res.data);
                // setLoaded(true);
            })
            .catch((err) => {
                console.log('Some error');
                console.log(err);
            })

    }, [])

    // (allposts).map((c,i)=>{
    //     map()
    // })
}