import GenericTaskTab from './gen-task-tab'
import DetailsTab from './details-tab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function InfoTabsMain() {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="priority">Priorty</TabsTrigger>
        <TabsTrigger value="client">Client Feedback</TabsTrigger>
        <TabsTrigger value="elements">Elements</TabsTrigger>
        <TabsTrigger value="items-keep">Items to Keep</TabsTrigger>
        <TabsTrigger value="items-remove">Items to Remove</TabsTrigger>
        <TabsTrigger value="inspirations">Inspirations</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DetailsTab />
      </TabsContent>
      <TabsContent value="priority">
        <GenericTaskTab type="PRIORITY" />
      </TabsContent>
      <TabsContent value="client">
        <GenericTaskTab type="CLIENT_FEEDBACK" />
      </TabsContent>
      <TabsContent value="elements">
        <GenericTaskTab type="ELEMENT" />
      </TabsContent>
      <TabsContent value="items-keep">
        <GenericTaskTab type="ITEM_TO_KEEP" />
      </TabsContent>
      <TabsContent value="items-remove">
        <GenericTaskTab type="ITEM_TO_REMOVE" />
      </TabsContent>
      <TabsContent value="inspirations">
        <GenericTaskTab type="INSPIRATION" />
      </TabsContent>
    </Tabs>
  )
}
