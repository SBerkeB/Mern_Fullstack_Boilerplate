import { useQuery } from "react-query";
import axios from "axios"
import { User } from "../interfaces/User"
import { Card } from "../components/Card";
import styled from 'styled-components';
import { FaDatabase } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header"

export const Users: React.FC = () => {

  const getUsers = async () => await axios.get("http://localhost:3001/users").then(res => res.data);

  const { data: users, isLoading, isError, refetch } = useQuery(['users'], getUsers);

  const navigate = useNavigate();
  const newUserRedirect = async() => {
    navigate('/main');
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Oops something went wrong!</div>
  }

  return (
    <>
      <Header title="MERN Stack with Typescript + Vite"/>
      <ButtonStyled onClick={() => newUserRedirect()}><FaDatabase/> Home </ButtonStyled>
      <ButtonStyled onClick={() => refetch()}><FaDatabase/> Refresh Database</ButtonStyled>
      <UsersContainer>
        {Array.isArray(users) && users.map((user: User, key: number) => <Card user={user} key={key}/>)}
      </UsersContainer>
    </>
  );
}

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
`
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