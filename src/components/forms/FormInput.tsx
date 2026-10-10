"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { HTMLInputTypeAttribute } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  fieldClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete = "on",
  fieldClassName,
  inputClassName,
  errorClassName,
}: FormInputProps<T>) {
  const id = `form-${name}`;

  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Field data-invalid={fieldState.invalid} className={fieldClassName}>
            <FieldLabel htmlFor={id} className="mt-2">
              {label}
            </FieldLabel>
            <Input
              {...field}
              id={id}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              className={cn("bg-white shadow-xl/10", inputClassName)}
            />
            {fieldState.invalid &&
              (fieldState.isTouched || formState.isSubmitted) && (
                <FieldError
                  errors={[fieldState.error]}
                  className={errorClassName}
                />
              )}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
