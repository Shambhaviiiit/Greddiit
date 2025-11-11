import { useState } from "react";
import './Box.css'
import axios from "axios";
import { SearchOffRounded } from '@mui/icons-material';

export default function Search(props) {

    // const [input, setInput] = useState('')
    const searching_ = (e) => {
        props.setTosearch(e.target.value)

    }

    return (
        <div>
            <form>
                <input type="text" id="search" name="search" placeholder="Search" className="searchbar" onChange={searching_}></input>
            </form>
        </div>
    );
}