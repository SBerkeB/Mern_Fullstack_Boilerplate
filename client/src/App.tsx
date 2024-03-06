import styled from "styled-components"
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from "./components/Header"
import { HomePage } from './routes/HomePage';
import { Users } from './routes/Users'
import { NewCollectionPage } from './routes/NewCollectionPage';
import MainPage from "./routes/MainPage"
import AuthProtection from "./global/AuthProtection.jsx"
import LogOutButton from "./components/LogOut"




const App  = () => {
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppStyled>
        <Header title="MERN Stack with Typescript + Vite"/>
        <LogOutButton />
        <Routes>

        <Route
          path="/"
          element={
            <AuthProtection>
              <HomePage />
            </AuthProtection>
          }
        />

          <Route path="/users" element={<Users />} />
          <Route path="/new_user" element={<NewCollectionPage />} />
          <Route path="/login" element={<MainPage />} />
        </Routes>
      </AppStyled>
    </QueryClientProvider>
  )
}

const AppStyled = styled.div`
  text-align: center;
`

export default App
