import { useState } from "react";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthUser from './AuthUser';

export default function Register() {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [error, setError] = useState('');

  const bademailnotify = () => {
    toast.error('Niepoprawne dane logowania!', { autoClose: 5000 });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Pole Nazwa użytkownika jest wymagane'),
    email: Yup.string().email('Nieprawidłowy adres email').required('Pole Adres email jest wymagane'),
    password: Yup.string().required('Pole Hasło jest wymagane'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const usernameResponse = await http.get(`/check-username?username=${values.name}`);
      if (usernameResponse.data.exists) {
        setError('Nazwa użytkownika jest już zajęta.');
        return;
      }

      const registerResponse = await http.post('/register', values);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.email) {
        setError(error.response.data.email[0]);
      } else {
        setError('Wystąpił błąd rejestracji.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">Zarejestruj się</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="name">Nazwa użytkownika:</label>
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Podaj nazwę użytkownika"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Adres email:</label>
                <Field
                  type="email"
                  className="form-control"
                  placeholder="Podaj email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="password">Hasło:</label>
                <Field
                  type="password"
                  className="form-control"
                  placeholder="Podaj hasło"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Zarejestruj się
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}