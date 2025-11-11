function UnAuth(props){
    props.setAuth((x)=>(0));
    {console.log("Unauth : ", props.auth)}
}

export default UnAuth;