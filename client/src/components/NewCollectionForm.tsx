import React, { useState } from 'react';
import { User } from '../interfaces/User';


export const NewCollectionForm: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default NewCollectionForm;