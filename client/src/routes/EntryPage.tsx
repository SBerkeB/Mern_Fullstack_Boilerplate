import React, { useState } from 'react';
import styled from 'styled-components';

import { UserLogin } from '../interfaces/Login';
import { User } from '../interfaces/User';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';


export const EntryPage: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [loginState, setLoginState] = useState(true);
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [createAccountState, setCreateAccountState] = useState(false);

  const Navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    Navigate("/main");

  };

  const handleForgotPassword = async (event: any) => {
    event.preventDefault();
    if(emailAddress) {
      setUserName("");
    } else {
      setEmailAddress("");
    }

    console.log("Forgot Password");
    console.log(emailAddress);
    console.log(userName);
    //Deal with forgotten password
  }

  const handleCreateAccount = async (event: any) => {
    event.preventDefault();
    event.preventDefault();
    const data: User = {
        name: name,
        lastName: lastName,
        userName: userName,
        emailAddress: emailAddress,
        password: password
    };
    console.log(data);
    const response = await fetch('http://localhost:3001/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

    console.log(response);
  }


  //Add "email or username" functionality

  return (
    <>
      <Header title="MERN Stack with Typescript + Vite"/>

      { loginState && <form onSubmit={handleLogin}>
        <label>
          Email Address:
          <input type="email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
        <ButtonStyled onClick={() => { setForgotPasswordState(true); setLoginState(false); }}>Forgot Password</ButtonStyled>
        <ButtonStyled onClick={() => { setCreateAccountState(true); setLoginState(false); }}>Create Account</ButtonStyled>
      </form> }

      { forgotPasswordState && <form onSubmit={handleForgotPassword}>
        <label>
          Email Address or User Name:
          <input required type="text" value={emailAddress || userName} onChange={e => e.target.value.includes('@') ? 
          setEmailAddress(e.target.value) : setUserName(e.target.value)} />
        </label>
        {/* Here we are checking if the user is entering their username or mail address for validation.*/}
        <input type="submit" value="Submit" />
        <ButtonStyled onClick={() => { setLoginState(true); setForgotPasswordState(false); }}>Back to Login</ButtonStyled>
        <ButtonStyled onClick={() => { setCreateAccountState(true); setForgotPasswordState(false); }}>Create Account</ButtonStyled>
      </form> }

      { createAccountState && <form onSubmit={handleCreateAccount}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <label>
          User Name:
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          Email Address:
          <input type="email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
        <ButtonStyled onClick={() => { setForgotPasswordState(true); setCreateAccountState(false); }}>Forgot Password</ButtonStyled>
        <ButtonStyled onClick={() => { setLoginState(true); setCreateAccountState(false); }}>Back to Login</ButtonStyled>
      </form> }

    </>
  );
};

const ButtonStyled = styled.button`
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`
