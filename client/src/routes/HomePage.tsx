import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';


export const HomePage: React.FC = () => {

    const Navigate = useNavigate();

    const addNewHandler = () => {
        Navigate("/new_user");
    };
    const viewAllHandler = () => {
        Navigate("/users");
    };
    const viewOneHandler = () => {};
    const updateHandler = () => {};
    const deleteHandler = () => {};

  return (
    <>
        <Header title="MERN Stack with Typescript + Vite"/>
        <ButtonStyled onClick={addNewHandler}>Add New</ButtonStyled>
        <ButtonStyled onClick={viewAllHandler}>View All</ButtonStyled>
        <ButtonStyled onClick={viewOneHandler}>View One</ButtonStyled>
        <ButtonStyled onClick={updateHandler}>Update</ButtonStyled>
        <ButtonStyled onClick={deleteHandler}>Delete</ButtonStyled>
    </>
  );
}


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
