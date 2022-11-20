import { useState, useCallback } from 'preact/hooks';
import { Button } from '../components/Button.tsx';
import { PrimaryProfileCard } from '../components/cards/PrimaryProfileCard.tsx';

interface Props {
  title: string;
}

export default function PrimaryTab(props: Props) {
  return (
    <div class="w-full">
      <p class="flex-grow-1 font-bold text-xl text-pink-700">{props.title}</p>
      <PrimaryProfileCard />
      <PrimaryProfileCard />
    </div>
  );
}
