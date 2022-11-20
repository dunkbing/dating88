import { useState, useCallback } from 'preact/hooks';
import { Button } from '../components/Button.tsx';

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);

  const countFunc = useCallback((c: number) => {
    return () => setCount(c);
  }, []);

  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{count}</p>
      <Button onClick={countFunc(count - 1)}>-1</Button>
      <Button onClick={countFunc(count + 1)}>+1</Button>
    </div>
  );
}
