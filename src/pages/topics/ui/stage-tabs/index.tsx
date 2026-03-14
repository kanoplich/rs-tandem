import { STAGE_FIRST_TEXT, STAGE_SECOND_TEXT, STAGE_THIRD_TEXT } from '../../locales';

import styles from './styles.module.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';

export const StageTabs = () => {
  return (
    <section className="container mx-auto max-w-[1280px] px-4 pt-6">
      <Tabs
        defaultValue="stages1"
        className="w-full max-w-[1248px] mx-auto rounded-lg border-0 px-[3px]"
      >
        <TabsList className="w-full h-[36px] bg-input p-0 rounded-lg border-0 flex">
          <TabsTrigger className={styles.trigger} value="stage1">
            {STAGE_FIRST_TEXT.TITLE}
          </TabsTrigger>
          <TabsTrigger className={styles.trigger} value="stage2">
            {STAGE_SECOND_TEXT.TITLE}
          </TabsTrigger>
          <TabsTrigger className={styles.trigger} value="stage3">
            {STAGE_THIRD_TEXT.TITLE}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stage1" className="mt-4 w-full h-[147.8px] mx-auto">
          <Card className="bg-card border-0">
            <CardHeader>
              <CardTitle>{STAGE_FIRST_TEXT.TITLE}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{STAGE_FIRST_TEXT.DESCRIPTION}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stage2" className="mt-4 w-full mx-auto">
          <Card className="bg-card border-0">
            <CardHeader>
              <CardTitle>{STAGE_SECOND_TEXT.TITLE}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{STAGE_SECOND_TEXT.DESCRIPTION}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stage3" className="mt-4 w-full mx-auto">
          <Card className="bg-card border-0">
            <CardHeader>
              <CardTitle>{STAGE_THIRD_TEXT.TITLE}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{STAGE_THIRD_TEXT.DESCRIPTION}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
