import { STAGE_TEXT } from '../../locales';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';

export const StageTabs = () => {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6">
      <Tabs defaultValue="stage1" className="w-full max-w-312 mx-auto">
        <TabsList variant="stages">
          {STAGE_TEXT.map((stage) => (
            <TabsTrigger key={stage.ID} value={stage.ID} variant="stages">
              {stage.TITLE}
            </TabsTrigger>
          ))}
        </TabsList>
        {STAGE_TEXT.map((stage) => (
          <TabsContent key={stage.ID} value={stage.ID} className="mt-4 w-full h-[147.8px] mx-auto">
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
