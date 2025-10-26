import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui';
import { cn } from '@/lib';

// Define a generic type for PeriodToggleProps
interface RadioToggleProps<T> {
  value: T;
  onValueChange: (value: T) => void;
  options: { label: string; value: T }[];
  className?: string;
}

function RadioToggle<T extends string | number>({
  value,
  onValueChange,
  options,
  className,
}: RadioToggleProps<T>) {
  return (
    <RadioGroup
      value={String(value)}
      onValueChange={(val) => onValueChange(val as T)}
      className={cn(`flex flex-wrap items-center space-x-4`, className)}
    >
      {options.map((option) => (
        <div key={String(option.value)} className="flex items-center gap-3">
          <RadioGroupItem
            value={String(option.value)}
            id={String(option.value)}
            className="data-[state=checked]:border-figma-primary cursor-pointer data-[state=checked]:bg-figma-primary data-[state=checked]:text-figma-primary"
          />
          <Label htmlFor={String(option.value)} className="text-sm text-slate-300">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default RadioToggle;
