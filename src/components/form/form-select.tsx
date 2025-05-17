import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import type { Control, FieldValues, Path } from 'react-hook-form'

type SelectValues = Array<{ value: string; label: string }>

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder: string
  data: SelectValues
  isLoading?: boolean
}

export default function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  data,
  isLoading,
  placeholder,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={isLoading}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.length === 0 && (
                <div className="text-muted-foreground text-sm py-2">
                  No results.
                </div>
              )}
              {data.map((dep) => (
                <SelectItem key={dep.value} value={dep.value}>
                  {dep.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
