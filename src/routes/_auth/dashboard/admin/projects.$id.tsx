import { createFileRoute } from '@tanstack/react-router'
import { useSingleProject } from '@/hooks/use-single-project'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DetailsTab from '@/components/project-tabs/details-tab'

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
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="password">Priorty</TabsTrigger>
              <TabsTrigger value="client">Client Feedback</TabsTrigger>
              <TabsTrigger value="elemets">Elements</TabsTrigger>
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
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="clieny">Change your password here.</TabsContent>{' '}
            <TabsContent value="elements">
              Change your password here.
            </TabsContent>{' '}
            <TabsContent value="items">Change your password here.</TabsContent>{' '}
            <TabsContent value="inspirations">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
