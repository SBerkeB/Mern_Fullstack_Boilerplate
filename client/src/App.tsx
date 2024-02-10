import styled from "styled-components"
import { GlobalStyles } from "./global/GlobalStyles"
import { QueryClient, QueryClientProvider } from "react-query"
import { Header } from "./components/Header"
import { EntryPage } from "./routes/EntryPage"



export const App: React.FC = () => {
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <AppStyled>
      <GlobalStyles/>
      <Header title="MERN Stack with Typescript + Vite"/>
      <QueryClientProvider client={queryClient}>
        <EntryPage />
      </QueryClientProvider>
    </AppStyled>
  )
}

const AppStyled = styled.div`
  text-align: center;
`
