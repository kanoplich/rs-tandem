import { MessageCircle } from 'lucide-react';

import { Button } from '@/shared/ui';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
    >
      <MessageCircle className="h-5 w-5" />
    </Button>
  );
};
