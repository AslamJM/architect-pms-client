import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
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
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-teal-800">
            Phase - {phase_number.toString().padStart(2, '0')}
          </Badge>
          <Button>Verify Work</Button>
        </div>

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
