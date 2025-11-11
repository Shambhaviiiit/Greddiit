{/* <div className="col-12 col-lg-4 col-xl-3 order-2 order-lg-1">

    <div className="card mb-3">
        <div className="card-header">
            <div className="card-actions float-right">
                <div className="dropdown show">
                    <a href="#" data-toggle="dropdown" data-display="static">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-horizontal align-middle">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <h5 className="card-title mb-0">Following</h5>
        </div>
        <div className="card-body">
            <div className="media">
                <img src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png" width="56" height="56" className="rounded-circle mr-2" alt="Andrew Jones" />
                <div className="media-body">
                    <p className="my-1"><strong>Andrew Jones</strong></p>
                    <a className="btn btn-sm btn-outline-primary" href="#">Unfollow</a>
                </div>
            </div>
            <hr className="my-2" />
            <div className="media">
                <img src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png" width="56" height="56" className="rounded-circle mr-2" alt="John Smit" />
                <div className="media-body">
                    <p className="my-1"><strong>John Smit</strong></p>
                    <a className="btn btn-sm btn-outline-primary" href="#">Unfollow</a>
                </div>
            </div>
            <hr className="my-2" />
            <div className="media">
                <img src="https://therichpost.com/wp-content/uploads/2021/03/avatar3.png" width="56" height="56" className="rounded-circle mr-2" alt="Marie Salter" />
                <div className="media-body">
                    <p className="my-1"><strong>Marie Salter</strong></p>
                    <a className="btn btn-sm btn-outline-primary" href="#">Unfollow</a>
                </div>
            </div>
        </div>
    </div>
</div> */}

// return (
    //     <div>
    //     {/* <Subgreddits /> */}
    //     <div className="Profile_outer">
    //         <center>
    //             <table>
    //                 <tr><td>
    //                     <Box>
    //                         <h1><center>My Profile</center></h1>
    //                     </Box>
    //                 </td>
    //                 </tr>
    //                 <Box>
    //                     <tr>
    //                          <td>
    //                             <img src="profile.jpg" class="profile_img"></img>
    //                         </td>
    //                         <td>
    //                             <form>
    //                                 <label for="fname" class="profile_page_font">First name </label>
    //                                 <input id="fname" type="text" value="admin" autofocus readonly class="editable"></input><br></br>
    //                                 <label for="lname" class="profile_page_font">Last name </label>
    //                                 <input id="lname" type="text" value="admin" autofocus readonly class="editable"></input><br></br>
    //                                 <label for="username" class="profile_page_font">Username </label>
    //                                 <input id="username" type="text" value="admin" autofocus readonly class="editable"></input><br></br>
    //                                 <label for="email" class="profile_page_font">Email ID </label>
    //                                 <input id="email" type="text" value="admin@admin.com" readonly class="editable"></input><br></br>
    //                                 <label for="age" class="profile_page_font">Age </label>
    //                                 <input id="age" type="text" value="19" readonly class="editable"></input><br></br>
    //                                 <label for="contact" class="profile_page_font">Contact</label>
    //                                 <input id="contact" type="text" value="7674023271" readonly class="editable"></input><br></br>
    //                             </form>
    //                         </td>
    //                     </tr>
    //                 </Box>
    //             </table>
    //         </center>
    //         <center>
    //         <div>
    //             <ul>
    //                 <li><button className = "list_button" onClick={()=>setFollowers(!followers)}>Followers</button></li>
    //                 {followers &&
    //                 <div>
    //                 <li><button className="list_button">Shambhavi</button></li>
    //                 <li><button className="list_button">Ananya</button></li>
    //                 <li><button className="list_button">Chandana</button></li>
    //                 </div>
    //                 }
    //             </ul>
    //             <ul>
    //                 <li><button className = "list_button" onClick={()=>setFollowing(!following)}>Following</button></li>
    //                 {following &&
    //                 <div>
    //                 <li><button className="list_button">Shambhavi</button></li>
    //                 <li><button className="list_button">Ananya</button></li>
    //                 <li><button className="list_button">Chandana</button></li>
    //                 </div>
    //                 }
    //             </ul>
    //         </div>
    //         <button class="logout entry" type="submit" onClick={()=>{props.setFlag((x)=>(1))}}>Logout</button>
    //         </center>
    //         <Outlet />
    //     </div>
    //             </div>
    // );