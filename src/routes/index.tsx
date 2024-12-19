import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { Mentors } from '../pages/Mentors';
import { Messages } from '../pages/Messages';
import { Feed } from '../pages/Feed';
import { Layout } from '../components/layout/Layout';
import { Login } from '../pages/auth/Login';
import { SignUp } from '../pages/auth/SignUp';
import { UserProfile } from '../pages/UserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/mentors', element: <Mentors /> },
      { path: '/messages', element: <Messages /> },
      { path: '/feed', element: <Feed /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/user/:userId', element: <UserProfile /> },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};