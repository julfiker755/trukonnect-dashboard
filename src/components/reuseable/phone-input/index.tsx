'use client';
import { useEffect, useMemo, useState } from 'react';
import { CircleAlert } from 'lucide-react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type ControllerRenderProps,
  type ControllerFieldState,
} from 'react-hook-form';
import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useGetCountryQuery } from '@/redux/api/admin/countryApi';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FlagBox from '../flag-box';

interface PhoneInputProps {
  stylelabel?: string;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: any) => any;
}

export function PhoneInput({
  name,
  label,
  placeholder = 'Enter phone number',
  stylelabel,
  className,
  onChange,
  ...rest
}: PhoneInputProps) {
  const { control } = useFormContext();
  const { data: countryResponse, isLoading } = useGetCountryQuery({
    skip: !name.length,
  });

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const countries = useMemo(() => (countryResponse?.data as any[]) || [], [countryResponse]);

  // ✅ Set default country on load
  useEffect(() => {
    if (countries.length && !selectedCountry) {
      const defaultCountry = countries[0];
      setSelectedCountry(defaultCountry);
      onChange(defaultCountry.id);
    }
  }, [selectedCountry, onChange, countries]);

  // ✅ Handle country selection change
  const handleCountryChange = (countryId: string) => {
    const country = countries.find((c) => c.id.toString() === countryId);
    if (country) {
      setSelectedCountry(country);
      onChange(country.id);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div>
          {label && (
            <Label className={cn('text-blacks text-base font-medium mb-1', stylelabel)}>
              {label}
            </Label>
          )}

          <div className="relative flex space-x-2">
            {/* Country Select */}
            <Select
              value={selectedCountry?.id?.toString() || ''}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="!h-10 bg-figma-input w-20 border-none rounded-md">
                <SelectValue placeholder="Flag">
                  {selectedCountry ? (
                    <div className="flex items-center gap-1">
                      <FlagBox href={selectedCountry.flag} label={false} />
                    </div>
                  ) : (
                    <span className="text-gray-500">Select</span>
                  )}
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="border ml-16 border-input/10 bg-[#11161b]">
                <SelectGroup>
                  {isLoading ? (
                    <div className="p-2 text-sm text-gray-500">Loading...</div>
                  ) : (
                    countries.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={item.id.toString()}
                        className="hover:bg-transparent"
                      >
                        <div className="flex items-center gap-2">
                          <FlagBox href={item.flag} nameStyle="text-white" name={item.name} />
                          <span className="text-xs text-gray-500 ml-2">{item.dial_code}</span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Phone Input */}
            <Input
              {...field}
              {...rest}
              type="tel"
              placeholder={placeholder}
              className={cn('rounded-md bg-figma-input h-10 border-none flex-1', className)}
            />
          </div>

          {/* Error Message */}
          {error?.message && (
            <div className="flex items-center justify-end gap-1 text-sm pt-[1px] text-[#f73f4e]">
              {error.message}
              <CircleAlert size={14} />
            </div>
          )}
        </div>
      )}
    />
  );
}
