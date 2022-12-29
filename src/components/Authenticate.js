import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Authenticate = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [error, setError] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, login } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogIn) {
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        await signup(emailRef.current.value, passwordRef.current.value)
          .then(() => {
            navigate('/');
          })
          .catch(() => setError('Registration failed'));
      } else {
        setError("Passwords don't match");
      }
    } else {
      await login(emailRef.current.value, passwordRef.current.value)
        .then(() => {
          navigate('/');
        })
        .catch(() => setError('Log in failed'));
    }
  };

  return (
    <div className="flex-ctr-h flex-ctr-v">
      <div className="card">
        <form onSubmit={handleSubmit} className="flex-ctr-v">
          <input
            type="text"
            maxLength="320"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            type="password"
            maxLength="128"
            placeholder="Password"
            ref={passwordRef}
          />
          {!isLogIn && (
            <input
              type="password"
              maxLength="128"
              placeholder="Retype Password"
              ref={passwordConfirmRef}
            />
          )}
          <p style={{ background: 'red', color: 'white', maxWidth: '205px' }}>
            {error}
          </p>
          <button className="btn-prime" type="submit">
            {isLogIn ? 'Log In' : 'Sign Up'}
          </button>
          <hr />
          <p
            onClick={() => {
              setIsLogIn(!isLogIn);
              setError('');
            }}
            className="click-text"
          >
            {isLogIn ? 'Need to sign up?' : 'Need to log in?'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Authenticate;
