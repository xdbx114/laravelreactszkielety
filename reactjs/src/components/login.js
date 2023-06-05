import { useState } from "react"
import AuthUser from './AuthUser';

export default function Login() {
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const submitForm = () => {
        // api call
        http.post('/login', { email: email, password: password })
          .then((res) => {
            setToken(res.data.user, res.data.access_token);
            setShowSuccessAlert(true);
            setShowErrorAlert(false);
          })
          .catch(() => {
            setShowSuccessAlert(false);
            setShowErrorAlert(true);
          });
      }

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Zaloguj sie </h1>
                    {showSuccessAlert && (
                        <div className="alert alert-success" role="alert">
                        Logowanie udane!
                        </div>
                    )}
                    {showErrorAlert && (
                        <div className="alert alert-danger" role="alert">
                        Nieprawidłowe dane logowania!
                        </div>
                    )}
                    <div className="form-group">
                        <label>Adres email:</label>
                        <input type="email" className="form-control" placeholder="Podaj email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Haslo:</label>
                        <input type="password" className="form-control" placeholder="Podaj haslo"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Zaloguj sie</button>
                </div>
            </div>
        </div>
    )
}