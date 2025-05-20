import WorkingFileUploads from './working-files-upload'

type Props = {
  phase_no: number
}

export default function WorkingsFiles({ phase_no }: Props) {
  return (
    <div className="space-y-4">
      <div className="p-4 space-y-2">
        <h5>Working Files</h5>
        <WorkingFileUploads phase_no={phase_no} type="WORKING_FILES" />
      </div>
      <div className="p-4 space-y-2">
        <h5>Rendered Images</h5>
        <WorkingFileUploads phase_no={phase_no} type="RENDERED_IMAGES" />
      </div>
    </div>
  )
}
