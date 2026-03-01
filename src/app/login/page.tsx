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
// import axios from "axios";
import LoginSchemaType, { loginSchema } from "@/Schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  async function onLogin(values: LoginSchemaType) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("You have Logged in succesfully", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        router.push("/");
        return;
      }

      toast.error(res?.error ?? "Invalid email or password", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
    } catch {
      toast.error("Something went wrong. Please try again.", {
        duration: 3000,
        position: "top-center",
        richColors: true,
      });
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-5 mt-10 sm:mt-16">
      <h1 className="text-2xl text-center font-bold">Sign In</h1>

      <form onSubmit={handleSubmit(onLogin)}>
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
                {fieldState.invalid && fieldState.isTouched && (
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
                {fieldState.invalid && fieldState.isTouched && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          className="bg-gray-600 mt-6 w-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Logging in...
            </>
          ) : (
            "LOGIN"
          )}
        </Button>
      </form>
    </div>
  );
}
