import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UploadedFiles from './uploaded-files'
import WorkingsFiles from './working-files'

type Props = {
  phase_number: number
}

export default function ProjectPhase({ phase_number }: Props) {
  return (
    <Card>
      <CardContent className="px-8">
        <Badge className="mb-2">
          Phase - {phase_number.toString().padStart(2, '0')}
        </Badge>
        <Tabs defaultValue="uploaded">
          <TabsList className="w-full">
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
      </CardContent>
    </Card>
  )
}
