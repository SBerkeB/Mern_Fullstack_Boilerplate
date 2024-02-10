import React from 'react'
import ReactDOM from 'react-dom/client'
import styled from "styled-components"

import { App } from './App'
import { ErrorPage } from './global/ErrorPage'
import { Users } from './routes/Users'
import { NewCollectionPage } from './routes/NewCollectionPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MainPage } from './routes/MainPage';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// const router = createBrowserRouter(
//   createRoutesFromElements([
//     <Route path="/" element={<App />} />,
//     <Route path="/new_user" element={<NewCollectionPage />} />,
//   ])
// );

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router}>
//       <Outlet />
//     </RouterProvider>
//   </React.StrictMode>
// )


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});


const AppStyled = styled.div`
  text-align: center;
`


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    
    path: "/users",
    element: 
    <AppStyled> 
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    </AppStyled>,
    errorElement: <ErrorPage />
    
  },

  {
    path: "/new_user",
    element: <NewCollectionPage />,
  },

  {
    path: "/main",
    element: <MainPage />,
  }

  // You can also have nested routes. Check this link for more info: https://reactrouter.com/en/main/start/tutorial#setup
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

