import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link} from 'react-router-dom';
import "../App.css";
import Home from '../components/home';
import Users from '../components/users';
import AuthUser from '../components/AuthUser';
import Addwpis from "../components/addwpis";
import Editwpis from "../components/editwpis";
import Wpis from "../components/wpis";
function Auth() {
    const {token,logout, getUserNickById, user} = AuthUser();
    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Strona glowna</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Użytkownicy</Link>
                    </li>
                    <li className="nav-item">
                        <span role="button" className="nav-link" onClick={logoutUser}>Wyloguj sie</span>
                    </li>
                    <span class="navbar-text ">
                    | Zalogowano: <b>{getUserNickById(user.id)}</b>
                    </span>
                </ul>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/addwpis" element={<Addwpis />} />
                    <Route path="/edit/:id" element={<Editwpis />} />
                    <Route path="/wpis" element={<Wpis />} />
                </Routes>
                <ToastContainer 
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
            </div>
        </>
    );
}

export default Auth;
