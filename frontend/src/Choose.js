import Box from "./Box";
import { useState } from "react";
import Login from "./Login";

function Choose(props) {
    const [login, setlogin] = useState(0);

    const loginHandler = () => {
        setlogin((prev) => (0));
    }

    const signupHandler = () => {
        setlogin((prev) => (1));
    }

    return (
        <div>
            <table className="signin_table">
                <tr>
                    <td><button className="signin entry" onClick={loginHandler}>Login</button></td>
                    <td><button className="signin entry" onClick={signupHandler}>Sign Up</button></td>
                </tr>
                <tr>
                    {console.log('Choose')}
                    <td colSpan='2'><Box><Login signup={login} auth={props.auth} setAuth={props.setAuth} /></Box></td>
                </tr>
            </table>
        </div>
    );
}

export default Choose;