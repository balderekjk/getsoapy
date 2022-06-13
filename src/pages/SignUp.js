import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.css';

function SignUp() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
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

    console.log(
      userNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
      passwordConfirmRef.current.value
    );

    // setLoading(false);
  };

  const loginRedirect = () => {
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
          Email:
          <input type="text" ref={emailRef} required />
        </label>
        <label>
          Password:
          <input type="text" ref={passwordRef} required />
        </label>
        <label>
          Confirm Password:
          <input type="text" ref={passwordConfirmRef} required />
        </label>
        <input disabled={loading} type="submit" value="Submit" />
      </form>
      <span style={{ paddingTop: '1.5ch' }}>
        Already have an account?{' '}
        <span
          onClick={loginRedirect}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          Log In
        </span>
      </span>
    </div>
  );
}

export default SignUp;
