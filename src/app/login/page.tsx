"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/schemas/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  async function onLogin(values: LoginValues) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) {
        toast.success("You have logged in successfully");
        router.push("/");
        return;
      }

      toast.error(res?.error ?? "Invalid email or password");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-5 mt-10 sm:mt-16">
      <h1 className="text-2xl text-center font-bold">Sign In</h1>

      <form onSubmit={handleSubmit(onLogin)}>
        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Enter your email"
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

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
