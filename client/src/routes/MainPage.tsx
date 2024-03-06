import { useState } from 'react';
import styled from 'styled-components';
import Cookies from "universal-cookie";

import { UserLogin } from '../interfaces/Login';
import { User } from '../interfaces/User';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';


const cookies = new Cookies();


export default function MainPage(){
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');


  // Form type states
  const [loginState, setLoginState] = useState(true);
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [registerState, setRegisterState] = useState(false);

  // Form subbmission states
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const Navigate = useNavigate();



  const handleLogin = async (event: any) => {
    event.preventDefault();
    console.log("Login triggered");

    const data: UserLogin = {
      identifier: emailAddress || userName,
      password: password
    };
    //console.log(data);
    await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((result) => {

        result.json()
        .then((data) => {

          cookies.set("TOKEN", data.token, {
            path: "/",
          });

          setLogin(true);
          
          const from = location.state?.from || '/';
          Navigate(from);

        }).catch((error) => {
          error = new Error();
        });

      })
      .catch((error) => { 
        error = new Error();
      });

  };

  

  const handleRegister = async (event: any) => {
    event.preventDefault();
    
    const data: User = {
        name: name,
        lastName: lastName,
        userName: userName,
        emailAddress: emailAddress,
        password: password
    };

    alert("Submited");
    console.log(data);
    await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((result) => {
        console.log(result);
        setRegister(true);
        Navigate("/main");
      })
      .catch((error) => { 
        error = new Error();
      });
  }

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
    


  //Add "email or username" functionality

  return (
    <>
      

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
        <ButtonStyled onClick={() => { setRegister(true); setLoginState(false); }}>Create Account</ButtonStyled>
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
        <ButtonStyled onClick={() => { setRegisterState(true); setForgotPasswordState(false); }}>Create Account</ButtonStyled>
      </form> }

      { register && <form onSubmit={handleRegister}>
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
        <ButtonStyled onClick={() => { setForgotPasswordState(true); setRegister(false); }}>Forgot Password</ButtonStyled>
        <ButtonStyled onClick={() => { setLoginState(true); setRegisterState(false); }}>Back to Login</ButtonStyled>
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
