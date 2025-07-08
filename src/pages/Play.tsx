import Chess from '@/components/chessboard/Chess';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';

export default function Play() {
  const { opening } = useParams<{ opening: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ['pgn', opening],
    queryFn: () => http(`/pgns/${opening}`),
    enabled: !!opening,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  console.log('PGN result:', data);

  return <Chess />;
}
