import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const registerRedirect = () => {
    console.log('redirecting...');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" ref={emailRef} required />
        </label>
        <input disabled={loading} type="submit" value="Reset Password" />
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

export default ForgotPassword;
