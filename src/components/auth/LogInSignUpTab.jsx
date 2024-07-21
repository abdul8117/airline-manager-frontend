import { Link } from "react-router-dom";
import { noLeftPadding } from "../../config";

function LogInSignUpTab({ showRegisterForm }) {
    return (
        <>
            <div className="section" style={noLeftPadding}>
                <div className="tabs is-boxed is-large">
                    <ul>
                        <li className={!showRegisterForm && "is-active"}>
                            <Link to="/login">
                                <span>Log in</span>
                            </Link>
                        </li>
                        <li className={showRegisterForm && "is-active"}>
                            <Link to="/register">
                                <span>Sign up</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default LogInSignUpTab;
