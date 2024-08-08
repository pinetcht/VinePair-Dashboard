import React from 'react'
import './index.css'
import { Login } from './roots/Login'
import { Dashboard } from './roots/Dashboard'
import ProtectedRoute from './components/ProtectedRoute';
import { createBrowserRouter, RouterProvider } from "react-router-dom"


const App = () => {
    const router = createBrowserRouter([
      { path: "/", element: <Login /> },
      { path: "/chart", element: <ProtectedRoute element={<Dashboard />} /> },
    ]);
  
    return <RouterProvider router={router} basename="/chart"/>;
  };
  
  export default App;
