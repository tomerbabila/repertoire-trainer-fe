import { useNavigate } from 'react-router';
import { openings } from '@/lib/helpers';
import Opening from '@/components/home/Opening';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center py-10'>
      <h1 className='text-2xl font-bold mb-8'>What opening would you like to learn today?</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {openings.map((opening) => (
          <Opening
            key={opening.key}
            name={opening.name}
            description={opening.description}
            onPlay={() => navigate(`/play/${opening.key}`)}
          />
        ))}
      </div>
    </div>
  );
}
