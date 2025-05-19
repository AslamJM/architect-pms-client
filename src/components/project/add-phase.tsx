import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UploadedFiles from './uploaded-files'
import WorkingsFiles from './working-files'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

export default function AddPhaseToProject() {
  const id = useProjectId()
  const { data } = useSingleProject(id)
  if (!data) return

  return (
    <div>
      <h4>Phase - 01</h4>
      <Tabs defaultValue="uploaded">
        <TabsList className="w-[600px]">
          <TabsTrigger value="uploaded">Uploaded Files</TabsTrigger>
          <TabsTrigger value="working">Working Files</TabsTrigger>
        </TabsList>
        <TabsContent value="uploaded">
          <UploadedFiles />
        </TabsContent>
        <TabsContent value="working">
          <WorkingsFiles />
        </TabsContent>
      </Tabs>
    </div>
  )
}
