import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link } from 'react-router-dom';
import "../App.css";
import Login from '../components/login';
import Register from '../components/register';

function Guest() {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Zaloguj sie</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Zarejestruj sie</Link>
                    </li>

                </ul>

            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/users" element={<Login />} />
                    <Route path="/edit" element={<Login />} />
                    <Route path="/addwpis" element={<Login />} />
                    <Route path="/edit/:id" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
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

export default Guest;
