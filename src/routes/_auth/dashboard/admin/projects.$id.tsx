import { createFileRoute } from '@tanstack/react-router'
import { useSingleProject } from '@/hooks/use-single-project'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DetailsTab from '@/components/project-tabs/details-tab'
import PriorityTab from '@/components/project-tabs/priority-tab'
import GenericTaskTab from '@/components/project-tabs/gen-task-tab'
import WorkSpace from '@/components/project/work-space'

export const Route = createFileRoute('/_auth/dashboard/admin/projects/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { data, isLoading } = useSingleProject(params.id)
  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {data && (
        <div className="p-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="p-8">
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
                  <DetailsTab
                    name={data.name}
                    description={data.description}
                    assigned_to={data.assigned_to.name}
                    design_notes={data.design_notes}
                  />
                </TabsContent>
                <TabsContent value="priority">
                  <PriorityTab />
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
            </TabsContent>
            <TabsContent value="work">
              <WorkSpace />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
