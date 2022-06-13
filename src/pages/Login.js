import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, , setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError('Passwords do not match');
    // }

    // try {
    //   setError('');
    //   setLoading(true);
    //   await SignUp(emailRef.current.value, passwordRef.current.value);
    //   // navigate('/');
    // } catch {
    //   setError('Failed to create an account');
    // }

    console.log(userNameRef.current.value, passwordRef.current.value);

    // setLoading(false);
  };

  const registerRedirect = () => {
    console.log('redirecting...');
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" ref={userNameRef} required />
        </label>
        <label>
          Password:
          <input type="text" ref={passwordRef} required />
        </label>
        <input disabled={loading} type="submit" value="Log In" />
      </form>
      <span style={{ paddingTop: '1.5ch' }}>
        Need an account?{' '}
        <span
          onClick={registerRedirect}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Sign Up
        </span>
      </span>
    </div>
  );
}

export default Login;
