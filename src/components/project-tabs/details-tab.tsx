import { format } from 'date-fns'
import { Card, CardContent } from '../ui/card'
import ProjectCompleted from '../project/project-completed'
import { useProjectId } from '@/hooks/use-project-id'
import { useSingleProject } from '@/hooks/use-single-project'

export default function DetailsTab() {
  const id = useProjectId()
  const { data } = useSingleProject(id)

  if (data) {
    return (
      <Card>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h6 className="font-semibold mb-1">Description</h6>
              <p className="text-sm text-muted-foreground">
                {data.description}
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-1">Design Notes</h6>
              <p className="text-sm text-muted-foreground">
                {data.design_notes}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <h6 className="font-semibold mb-1">Assign To</h6>
                <p className="text-sm text-muted-foreground">
                  {data.assigned_to.name}
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Assign By</h6>
                <p className="text-sm text-muted-foreground">
                  {data.assigned_by.name}
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Created At</h6>
                <p className="text-sm text-muted-foreground">
                  {format(data.created_at, 'PPP')}
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Completed</h6>
                <p className="text-sm text-muted-foreground">
                  <ProjectCompleted isCompleted={data.is_completed} />
                </p>
              </div>
              <div>
                <h6 className="font-semibold mb-1">Paid</h6>
                <p className="text-sm text-muted-foreground">
                  <ProjectCompleted isCompleted={data.is_paid} />
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}
