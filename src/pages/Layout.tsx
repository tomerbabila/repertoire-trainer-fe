import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <div>this is going to be a header</div>
      <Outlet />
      <div>this is going to be a footer</div>
    </div>
  );
}

export default Layout;
