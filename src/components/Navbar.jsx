import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

function Navbar() {
    const { token, logout } = useAuth();

    return (
        <nav className="navbar is-primary">
            <div className="navbar-brand">
                <h1 className="title navbar-item">Airline Manager</h1>
            </div>

            {token && (
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/home" className="navbar-item">
                            Home
                        </Link>
                        <Link to="/fleet" className="navbar-item">
                            Fleet
                        </Link>
                        <Link to="/routes" className="navbar-item">
                            Routes
                        </Link>
                        <Link to="/flights" className="navbar-item">
                            View and schedule flights
                        </Link>
                        <Link to="/buy-airplanes" className="navbar-item">
                            Buy airplanes
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                                href="/login"
                            >
                                Log out
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
