import React from 'react';
import NewCollectionForm from '../components/NewCollectionForm';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

export const NewCollectionPage: React.FC = () => {

  const Navigate = useNavigate();

  const homeButonHandler = () => {
    Navigate("/main");
  }

  return (
    <>
        <ButtonStyled onClick={() => homeButonHandler()}> Home </ButtonStyled>
        < NewCollectionForm />
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
