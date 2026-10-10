"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth.actions";
import { registerSchema, type RegisterValues } from "@/schemas/register.schema";
import { Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterValues>({
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

  async function onRegister(values: RegisterValues) {
    try {
      const res = await registerUser(values);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      toast.success("Account has been created.");
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-3 sm:px-5 mt-10 sm:mt-16">
      <h1 className="text-2xl text-center font-bold">Create Account</h1>

      <form onSubmit={handleSubmit(onRegister)}>
        <FormInput
          control={control}
          name="name"
          label="Name"
          placeholder="Enter your name"
        />
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
        <FormInput
          control={control}
          name="rePassword"
          label="Re-enter Password"
          type="password"
          placeholder="Re-enter your password"
        />
        <FormInput
          control={control}
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
        />

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
