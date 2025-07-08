import { formatTime } from '@/lib/helpers';

interface ClockProps {
  label: string;
  time: number;
}

export default function Clock({ label, time }: ClockProps) {
  return (
    <div className={'flex flex-col items-center'}>
      <span className='font-semibold'>{label}</span>
      <span className='text-2xl font-mono'>{formatTime(time)}</span>
    </div>
  );
}
