import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-between px-4 py-6 max-w-full'>
      <header className='text-lg font-semibold'>this is going to be a header</header>
      <main className='w-full flex justify-center'>
        <Outlet />
      </main>
      <footer className='text-sm text-muted-foreground'>this is going to be a footer</footer>
    </div>
  );
}

export default Layout;
