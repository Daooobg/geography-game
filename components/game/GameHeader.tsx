'use client';

import { useTranslation } from '@/lib/hooks/useTranslation';

type GameHeaderProps = {
  gameType: 'contours' | 'flags' | 'capitals';
  score: number;
  total: number;
}

export default function GameHeader({ gameType, score, total }: GameHeaderProps) {
  const { dictionary: t } = useTranslation();
  
  // Get the game title based on selected type
  const getGameTitle = () => {
    switch (gameType) {
      case 'contours':
        return "Контури";
      case 'flags':
        return "Знамена";
      case 'capitals':
        return "Столици";
      default:
        return t.game.start;
    }
  };
  
  return (
    <div className="w-full text-center mb-6">
      <h1 className="text-2xl font-bold mb-2">{getGameTitle()}</h1>
      <div className="flex justify-center items-center space-x-2">
        <span className="font-medium">{t.game.score}</span>
        <span className="text-xl font-bold">{score}</span>
        <span className="text-sm text-gray-500">от {total}</span>
      </div>
    </div>
  );
} 