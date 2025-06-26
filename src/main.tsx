import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './constants.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout, Game } from '@/pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Game />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
