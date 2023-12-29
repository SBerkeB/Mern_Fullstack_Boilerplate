import styled from "styled-components"
import { User } from "../interfaces/User";

interface Props {
  user: User;
}

export const Card: React.FC<Props> = ({user}) => {
 return (
    <StyledCard>
      <h1>{user.userName}</h1>
      <h2>{user.name}</h2>
      <h2>{user.lastName}</h2>
      <h2>{user.emailAddress}</h2>
    </StyledCard>
 )
}

const StyledCard = styled.div`
  padding: 1em;
  margin: 2em;
  width: 320px;
  height: 100%;
  border: 1px solid rgb(8, 82, 151);
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.86); 
  box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.86);
`