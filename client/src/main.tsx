import React from 'react'
import ReactDOM from 'react-dom/client'
import styled from "styled-components"

import App from './App'
import { ErrorPage } from './global/ErrorPage'
import { Users } from './routes/Users'
import { NewCollectionPage } from './routes/NewCollectionPage';
import { HomePage } from './routes/HomePage';


import { BrowserRouter } from "react-router-dom";



const AppStyled = styled.div`
  text-align: center;
`

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

