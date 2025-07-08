import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { NAV_ROUTES } from '@/lib/helpers';
import { Menu, BookOpen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const logo = (
    <div className='flex items-center gap-2'>
      <BookOpen className='w-6 h-6' />
      <span className='font-bold text-lg tracking-tight'>Repertoire Trainer</span>
    </div>
  );

  const routes = NAV_ROUTES.map((route) => {
    const button = (
      <Button
        variant='ghost'
        className={`text-base border-b-2 transition-none ${isActive(route.path) ? 'border-1' : 'border-transparent'}`}
      >
        <a href={route.path}>{route.label}</a>
      </Button>
    );

    if (!route.menu) {
      return <div key={route.path}>{button}</div>;
    }

    return (
      <Accordion type='single' collapsible key={route.path} className='relative w-auto'>
        <AccordionItem value='item-1' className='border-none'>
          <div className='flex items-center'>
            {button}
            <AccordionTrigger className='ml-1 px-1 py-1 bg-transparent border-none shadow-none rounded-full flex items-center'>
              <span className='sr-only'>Open {route.label} menu</span>
            </AccordionTrigger>
          </div>
          <AccordionContent className='absolute left-0 top-full w-full bg-[var(--background)] border rounded-b shadow-lg z-20 p-0'>
            <ul className='flex flex-col'>
              {route.menu.map((opening) => (
                <li key={opening.key} className='border-b last:border-b-0'>
                  <button
                    className='w-full text-left px-4 py-2 transition rounded-none'
                    onClick={() => navigate(`/practice/${opening.key}`)}
                  >
                    {opening.name}
                  </button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });

  return (
    <header className='w-full border-b shadow-sm flex items-center justify-between px-6 py-3'>
      <div className='flex items-center gap-8 flex-1'>
        {logo}
        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-4'>{routes}</nav>
      </div>
      <Separator orientation='vertical' className='h-6 mx-2 hidden md:block' />
      {/* Mobile burger menu */}
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon'>
              <Menu className='w-5 h-5' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='flex flex-col gap-4 px-6 py-16'>
            <SheetTitle>{logo}</SheetTitle>
            <SheetDescription className='sr-only'>Open the main navigation menu</SheetDescription>
            {routes}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
