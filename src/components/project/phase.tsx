import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UploadedFiles from './uploaded-files'
import WorkingsFiles from './working-files'

type Props = {
  phase_number: number
}

export default function ProjectPhase({ phase_number }: Props) {
  return (
    <div className="p-2 border-[1px] border-slate-100">
      <h4>Phase - {phase_number}</h4>
      <Tabs defaultValue="uploaded">
        <TabsList className="w-[600px]">
          <TabsTrigger value="uploaded">Uploaded Files</TabsTrigger>
          <TabsTrigger value="working">Working Files</TabsTrigger>
        </TabsList>
        <TabsContent value="uploaded">
          <UploadedFiles phase_no={phase_number} />
        </TabsContent>
        <TabsContent value="working">
          <WorkingsFiles phase_no={phase_number} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
