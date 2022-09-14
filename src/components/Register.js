import React, { useState } from 'react';
import { registerUser } from '../api';


const Register = ({ setToken, navigate }) => {
  // props.setToken
  // const {setToken} = props
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const results = await registerUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/profile');
    } else {
      console.log(results.error.message)
    }
  }

  return (
    <form id="forms" onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}>
      <h1 className="pageTtl">Create an Account</h1>
      <hr className="hr" />
      <label className="formLabel">Username:</label>
      <input
        type='text'
        placeholder='Enter Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <label className="formLabel">Password:</label>
      <input
        type='password'
        placeholder='Enter Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="submitBtn" type='submit'>Submit</button>
    </form>
  )
}

export default Register;