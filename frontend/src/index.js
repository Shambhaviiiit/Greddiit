import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './Profile';
import NoPage from './NoPage';
import NoPage2 from './NoPage2';
import Default from './Default.js'
import Choose from './Choose'
import { RedirectFunction } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useState } from 'react';
import Profile2 from './Profile2';
import Bar from './navbar/Bar';
import Subpage from './Subpage';
import Saved from './Saved';
import MySubs from './MySubs';
import Subgreddits from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Starter() {
  const [auth, setAuth] = useState(0);
  const [flag, setFlag] = useState(0);
  const [page, setPage] = useState('Subgreddits');

    useEffect((()=>{ 
      if(localStorage.length != 0)
      {
        setAuth(1);
      }
    }),[])
    console.log("actual auth : ", auth);   
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={auth === 1 ?  (<Profile2 />) : (<Choose auth={auth} setAuth={setAuth} />)} />
          <Route path="user-page" element={ auth === 1 ? (<Subgreddits auth={auth} setAuth={setAuth} page={page} setPage={setPage} flag={flag} setFlag={setFlag} default={1}/>) : (<NoPage2 auth={auth}/>) }/>
          <Route path="profile" element={<Profile auth={auth} setAuth={setAuth} flag={flag} setFlag={setFlag} page={page} setPage={setPage}/>}></Route>
          <Route path="subgreddiit-page/:sub_name" element={<Subpage auth={auth} setAuth={setAuth} flag={flag} setFlag={setFlag}/>}></Route>
          <Route path="mysubs" element={ auth === 1 ? (<MySubs page={page} setPage={setPage} auth={auth} setAuth={setAuth} flag={flag} setFlag={setFlag}/>) : (<NoPage2 auth={auth}/>)}></Route>
          <Route path="saved" element={ auth === 1 ? (<Saved page={page} setPage={setPage} auth={auth} setAuth={setAuth} flag={flag} setFlag={setFlag}/>) : (<NoPage2 auth={auth}/>)}></Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

root.render(<Starter />)














// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
