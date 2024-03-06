// import React from 'react';
// import { Route, useNavigate } from 'react-router-dom';
// import Cookies from 'universal-cookie';

// interface ProtectedRouteProps {
//   Path: string;
//   Component: React.ReactElement; // for the rest of the props that you don't need to type check
// }

// const AuthProtection: React.FC<ProtectedRouteProps> = ({ Path, Component }) => {
//     const navigate = useNavigate();
//     const cookies = new Cookies();
//     const token = cookies.get('TOKEN');

    
  
//     if (!token) {
//       navigate('/login');
//     }
  
//     return (
//       <Route path={Path} element={Component} />
//     );
//   };

// export default AuthProtection;

import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';


export default function AuthProtection({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const isAuthenticated = token ? true : false;

  const location = useLocation();
   
  return (
    isAuthenticated ? (children) : (<Navigate to="/login" state={{ from: location }}/>)
  );
}