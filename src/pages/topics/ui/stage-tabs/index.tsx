import { STAGE_FIRST_TEXT, STAGE_SECOND_TEXT, STAGE_THIRD_TEXT } from '../../locales';

import styles from './styles.module.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs';

export const StageTabs = () => {
  return (
    <section className="container mx-auto max-w-[1280px] px-4 pt-6">
      <Tabs
        defaultValue="stages"
        className="w-full max-w-[1248px] h-[36px] mx-auto rounded-lg bg-input border-0 px-[3px]"
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
        <TabsContent value="stage 1">
          <Card>
            <CardHeader>
              <CardTitle>{STAGE_FIRST_TEXT.TITLE}</CardTitle>
            </CardHeader>
            <CardContent className="">{STAGE_FIRST_TEXT.DESCRIPTION}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stage 2">
          <Card>
            <CardHeader>
              <CardTitle>{STAGE_SECOND_TEXT.TITLE}</CardTitle>
            </CardHeader>
            <CardContent className="">{STAGE_SECOND_TEXT.DESCRIPTION}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stage 3">
          <Card>
            <CardHeader>
              <CardTitle>{STAGE_THIRD_TEXT.TITLE}</CardTitle>
            </CardHeader>
            <CardContent className="">{STAGE_THIRD_TEXT.DESCRIPTION}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};
