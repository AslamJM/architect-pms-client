import { Trash2Icon } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function DeleteTaskDg() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
          <Trash2Icon className="w-4 h-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
        </DialogHeader>
        <div>Are you sure want to completely delete this section?</div>
      </DialogContent>
    </Dialog>
  )
}
