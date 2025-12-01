import { useState } from 'react';

export function useFormFields<T extends Record<string, any>>(
  initialState: T,
  initialErrors: Record<keyof T, string> = {} as Record<keyof T, string>
) {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<keyof T, string>>(initialErrors);

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error immediately when user types
    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validateFields = (rules: Record<keyof T, string>) => {
    let valid = true;
    const newErrors = { ...errors };

    for (const key in rules) {
      const field = key as keyof T;

      if (!formData[field]) {
        newErrors[field] = rules[field];
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  return { formData, handleChange, setFormData, errors, validateFields };
}
