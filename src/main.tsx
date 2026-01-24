import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import QueryProvider from './components/provider/query-provider';
import { ThemeProvider } from './components/provider/theme-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Initial Page</h1>,
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
