import { ImagePlusIcon } from 'lucide-react'

export default function AddMoreImagesToTask() {
  return (
    <div className="w-[130px] h-[100px] rounded border-[1px] border-muted-foreground flex flex-col items-center justify-center">
      <input type="file" name="file" className="hidden" />
      <ImagePlusIcon className="text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Add more</span>
    </div>
  )
}
