'use client';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from 'react-hook-form';

export function FakeInput({
  name,
  type = 'text',
  ...rest
}: {
  name: string;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'ref'>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => <input className="hidden" {...field} {...rest} />}
    />
  );
}
