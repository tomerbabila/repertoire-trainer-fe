import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Menu, BookOpen } from 'lucide-react';
import { useLocation } from 'react-router';

const NAV_ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/play', label: 'Play' },
  { path: '/practice/:opening', label: 'Practice' },
];

export default function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className='w-full border-b shadow-sm flex items-center justify-between px-6 py-3'>
      <div className='flex items-center gap-8 flex-1'>
        <div className='flex items-center gap-2'>
          <BookOpen className='w-6 h-6' />
          <span className='font-bold text-lg tracking-tight'>Repertoire Trainer</span>
        </div>
        <nav className='flex items-center gap-4'>
          {NAV_ROUTES.map((route) => (
            <Button
              key={route.path}
              variant='ghost'
              className={`text-base border-b-2 transition-none ${
                isActive(route.path) ? 'border-2' : 'border-transparent'
              }`}
              asChild
            >
              <a href={route.path}>{route.label}</a>
            </Button>
          ))}
        </nav>
      </div>
      <Separator orientation='vertical' className='h-6 mx-2' />
      <Button variant='outline' size='icon'>
        <Menu className='w-5 h-5' />
      </Button>
    </header>
  );
}
