import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OpeningProps {
  name: string;
  description: string;
  onPlay: () => void;
}

export default function Opening({ name, description, onPlay }: OpeningProps) {
  return (
    <Card className='flex flex-col h-full'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1'>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={onPlay}>Let's Play</Button>
      </CardFooter>
    </Card>
  );
}
