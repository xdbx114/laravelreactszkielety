import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link} from 'react-router-dom';
import "../App.css";
import Home from '../components/home';
import Users from '../components/users';
import Edit from '../components/edit';
import AuthUser from '../components/AuthUser';
import Addwpis from "../components/addwpis";
import Editwpis from "../components/editwpis";
function Auth() {
    const {token,logout} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Strona glowna</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Użytkownicy</Link>
                    </li>
                    <li className="nav-item">
                        <span role="button" className="nav-link" onClick={logoutUser}>Wyloguj sie</span>
                    </li>

                </ul>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/edit" element={<Edit />} />
                    <Route path="/addwpis" element={<Addwpis />} />
                    <Route path="/edit/:id" element={<Editwpis />} />
                </Routes>
            </div>
        </>
    );
}

export default Auth;
