import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-between px-4 py-6 max-w-full'>
      <Header />
      <main className='w-full flex justify-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
