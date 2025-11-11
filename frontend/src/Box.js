import './Box.css'
import Choose from './Choose'

function Box(props) {
    return (
        <div className="loginBox">
            {props.children}
        </div>
    );
}

export default Box;