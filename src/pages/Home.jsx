import AirlineInfo from "../components/AirlineInfo.jsx";
import Navbar from "../components/Navbar.jsx";
import { noLeftPadding } from "../config.js";

function Home() {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="section" style={noLeftPadding}>
                    <h1 className="title">Welcome to Airline Manager!</h1>
                </div>

                <div className="columns">
                    <div className="column">
                        <div className="card">
                            <div className="card-content">
                                <AirlineInfo />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="card">
                            <h4 className="title">Finances</h4>
                            <ul>
                                <li>Revenue: *TODO*</li>
                                <li>Costs: *TODO*</li>
                                <li>Profit: *TODO*</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <h4 className="title">Graphs *TODO*</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
