import GenericTaskTab from './gen-task-tab'
import DetailsTab from './details-tab'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function InfoTabsMain() {
  const id = useProjectId()
  const { data } = useSingleProject(id)

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="priority">Priorty</TabsTrigger>
        <TabsTrigger value="client">Client Feedback</TabsTrigger>
        <TabsTrigger value="elements">Elements</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
        <TabsTrigger value="inspirations">Inspirations</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        {data && (
          <DetailsTab
            name={data.name}
            description={data.description}
            assigned_to={data.assigned_to.name}
            design_notes={data.design_notes}
          />
        )}
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
      <TabsContent value="items">
        <GenericTaskTab type="ITEM_TO_KEEP" />
      </TabsContent>
      <TabsContent value="inspirations">
        <GenericTaskTab type="INSPIRATION" />
      </TabsContent>
    </Tabs>
  )
}
