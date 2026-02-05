import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import QueryProvider from './components/provider/query-provider';
import { ThemeProvider } from './components/provider/theme-provider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import DashboardLayout from './components/layout/Dashboard-Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        handle: {
          title: 'Dashboard',
        },
      },
      {
        path: '/posts',
        element: <Posts />,
        handle: {
          title: 'Posts',
        },
      },
    ],
  },
]);

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <RouterProvider router={router}></RouterProvider>
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>,
);
