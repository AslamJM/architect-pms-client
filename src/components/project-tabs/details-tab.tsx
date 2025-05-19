type Props = {
  name: string
  description: string
  design_notes: string
  assigned_to: string
}

export default function DetailsTab({
  name,
  description,
  design_notes,
  assigned_to,
}: Props) {
  return (
    <div className="space-y-4">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{design_notes}</p>
      <div>Assigned To: {assigned_to}</div>
    </div>
  )
}
