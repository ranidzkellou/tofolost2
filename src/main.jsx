/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import TaskSmallCard
 from './components/TasksmallCard.jsx';
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
//import AuthProvider from './context/AuthProvider.jsx'
//import ProtectedRoute from './components/ProtectedRoute'

import { useEffect,useState } from 'react';
// Import pages
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Tasks from './pages/Tasks'
import Dashboard from './pages/Dashboard'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
