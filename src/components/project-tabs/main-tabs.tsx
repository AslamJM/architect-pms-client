import WorkSpace from '../project/work-space'
import InfoTabsMain from './info-tab-main'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MainTabs() {
  return (
    <div className="py-4 md:py-8 px-4 md:px-16">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="p-8">
          <InfoTabsMain />
        </TabsContent>
        <TabsContent value="work">
          <WorkSpace />
        </TabsContent>
      </Tabs>
    </div>
  )
}
