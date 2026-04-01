import { Play } from 'lucide-react';

import { TOPICS_TOOLBAR_TEXT } from '../../locales';

import { Button, Card } from '@/shared';

interface TopicToolbarProps {
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onStartTraining: () => void;
}

export const TopicToolbar = ({
  selectedCount,
  onSelectAll,
  onDeselectAll,
  onStartTraining,
}: TopicToolbarProps) => {
  return (
    <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">{TOPICS_TOOLBAR_TEXT.SELECTED}</p>
        <p className="text-xl font-bold">{selectedCount}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={onSelectAll}>
          {TOPICS_TOOLBAR_TEXT.SELECT_ALL}
        </Button>
        <Button variant="outline" size="sm" onClick={onDeselectAll}>
          {TOPICS_TOOLBAR_TEXT.DESELECT_ALL}
        </Button>
        <Button size="sm" disabled={selectedCount === 0} onClick={onStartTraining}>
          <Play className="h-4 w-4 mr-1" />
          {TOPICS_TOOLBAR_TEXT.START_TRAINING}
        </Button>
      </div>
    </Card>
  );
};
