import { Separator } from '@/components/ui/separator';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='w-full shadow-sm flex flex-col items-center justify-center px-6 py-4 mt-8'>
      <Separator className='mb-4' />
      <div className='flex items-center gap-4 mb-2'>
        <a href='https://github.com/tomerbabila' target='_blank' rel='noopener noreferrer' aria-label='GitHub'>
          <Github className='w-5 h-5 transition' />
        </a>
        <a
          href='https://www.linkedin.com/in/tomer-babila/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='LinkedIn'
        >
          <Linkedin className='w-5 h-5 transition' />
        </a>
      </div>
      <span className='text-xs text-muted-foreground'>
        &copy; {new Date().getFullYear()} Repertoire Trainer. All rights reserved.
      </span>
    </footer>
  );
}
