import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import UploadedFiles from './uploaded-files'
import VerifyPhase from './verify-phase'
import WorkingsFiles from './working-files'

type Props = {
  phase_number: number
  verified: boolean
}

export default function ProjectPhase({ phase_number, verified }: Props) {
  return (
    <Card>
      <CardContent className="px-8">
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-teal-800">
            Phase - {phase_number.toString().padStart(2, '0')}
          </Badge>
          <VerifyPhase phase_number={phase_number} verified={verified} />
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
