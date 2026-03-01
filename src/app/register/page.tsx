"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RegisterSchemaType, { registerSchema } from "@/Schema/register.schema";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  async function onRegister(values: RegisterSchemaType) {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values,
      );

      if (res.data.message === "success") {
        toast.success("Account has been created.", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        router.push("/login");
        return;
      }

      toast.error("Something went wrong. Please try again.", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error("Email already exists. Please use a different email.", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        return;
      }

      toast.error("Something went wrong. Please try again.", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = form;

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-5 mt-10 sm:mt-16">
      <h1 className="text-2xl text-center font-bold">Create Account</h1>

      <form onSubmit={handleSubmit(onRegister)}>
        {/* Name Form */}
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="mt-2">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your name"
                  type="text"
                  className="bg-white shadow-xl/10"
                />
                {fieldState.invalid && (fieldState.isTouched || isSubmitted) && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Email Form */}
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="mt-2">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your email"
                  type="text"
                  className="bg-white shadow-xl/10"
                />
                {fieldState.invalid && (fieldState.isTouched || isSubmitted) && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Password Form */}
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="mt-2">Password</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your password"
                  type="password"
                  className="bg-white shadow-xl/10"
                />
                {fieldState.invalid && (fieldState.isTouched || isSubmitted) && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/*Re Password Form */}
        <FieldGroup>
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="mt-2">Re-enter Password</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-rePassword"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Re-enter your password"
                  type="password"
                  className="bg-white shadow-xl/10"
                />
                {fieldState.invalid && (fieldState.isTouched || isSubmitted) && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        {/*Re Password Form */}
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="mt-2">Phone Number</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-phone"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your phone number"
                  type="tel"
                  className="bg-white shadow-xl/10"
                />
                {fieldState.invalid && (fieldState.isTouched || isSubmitted) && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          className="bg-gray-600 mt-6 w-full shadow-xl/10"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Creating account...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </div>
  );
}
