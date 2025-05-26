import { SelectSeparator } from '../ui/select'
import RenderedImages from './rendered-images'
import WorkingFileUploads from './working-files-upload'

type Props = {
  phase_no: number
}

export default function WorkingsFiles({ phase_no }: Props) {
  return (
    <div className="space-y-4">
      <div className="p-4 space-y-2">
        <h5 className="text-md font-semibold">Working Files</h5>
        <WorkingFileUploads phase_no={phase_no} type="WORKING_FILES" />
      </div>
      <SelectSeparator />
      <div className="p-4 space-y-2">
        <h5 className="text-md font-semibold">Rendered Images</h5>
        <RenderedImages phase_no={phase_no} />
      </div>
    </div>
  )
}
