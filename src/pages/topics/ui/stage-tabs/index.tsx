import { DEFAULT_VALUE } from '../../lib/constants';
import { STAGE_TEXT } from '../../locales';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared';

export const StageTabs = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6">
      <Tabs defaultValue={DEFAULT_VALUE} className="w-full max-w-312 mx-auto">
        <TabsList variant="stages">
          {STAGE_TEXT.map((stage) => (
            <TabsTrigger key={stage.ID} value={stage.ID} variant="stages">
              {stage.TITLE}
            </TabsTrigger>
          ))}
        </TabsList>
        {STAGE_TEXT.map((stage) => (
          <TabsContent key={stage.ID} value={stage.ID} className="mt-4 w-full mx-auto">
            <Card className="bg-card border-0">
              <CardHeader>
                <CardTitle>{stage.TITLE}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{stage.DESCRIPTION}</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
