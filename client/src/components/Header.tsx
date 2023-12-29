import styled from "styled-components";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({title}) => {
  return (
    <HeaderStyled>
      <h1>{title}</h1>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  width: 100%;
  padding: 1em;
  text-align: left;
  color: white;
  background-color: #000;
`

