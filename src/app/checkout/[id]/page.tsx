"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import checkoutSchemaType, { checkOutSchema } from "@/Schema/checkOut.schema";
import { checkPayment, type PaymentMethod } from "@/CheckOutActions/checkOut";

export default function CheckOut() {
  const router = useRouter();
  const { id }: { id: string } = useParams();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");

  // console.log(id);

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkOutSchema),
    mode: "onTouched",
  });

  async function handleCheckOut(values: checkoutSchemaType) {
    const res = await checkPayment(id, values, paymentMethod);

    if (paymentMethod === "credit") {
      const paymentRoute = res?.session?.url;
      const isSuccess = res?.status === "success";

      if (isSuccess && paymentRoute) {
        router.push(paymentRoute);
        toast.success("Redirecting you to credit payment", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        return;
      }
    } else {
      const isSuccess = res?.status === "success";

      if (isSuccess) {
        toast.success("Cash order is placed successfully", {
          duration: 3000,
          position: "top-center",
          richColors: true,
        });
        router.push("/allorders");
        return;
      }
    }

    toast.error("Something went wrong please try again later", {
      duration: 4000,
      position: "top-center",
      richColors: true,
    });
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-5 my-6 sm:my-10">
      <div className="text-white bg-teal-800 border border-teal-700 p-4 sm:p-6 md:p-8 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl text-center text-white font-bold mb-4 sm:mb-6">
          CheckOut
        </h1>

        <form onSubmit={handleSubmit(handleCheckOut)} className="space-y-4">
        {/* Details Form */}
        <FieldGroup>
          <Controller
            name="details"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="data-[invalid=true]:text-red-300"
              >
                <FieldLabel className="mt-2">Details</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-details"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your Details"
                  type="text"
                  className="bg-white text-black shadow-xl/10 h-10 sm:h-11"
                />
                {fieldState.invalid && fieldState.isTouched && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-300"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Phone Form */}
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="data-[invalid=true]:text-red-300"
              >
                <FieldLabel className="mt-2">Phone Number</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-phone"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your Phone Number"
                  type="tel"
                  className="bg-white text-black shadow-xl/10 h-10 sm:h-11"
                />
                {fieldState.invalid && fieldState.isTouched && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-300"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* City Form */}
        <FieldGroup>
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="data-[invalid=true]:text-red-300"
              >
                <FieldLabel className="mt-2">City</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-city"
                  aria-invalid={fieldState.invalid}
                  autoComplete="on"
                  placeholder="Enter your City"
                  type="text"
                  className="bg-white text-black shadow-xl/10 h-10 sm:h-11"
                />
                {fieldState.invalid && fieldState.isTouched && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-300"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="pt-1">
          <p className="font-semibold mb-2">Payment Method</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <label className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="accent-emerald-500"
              />
              Cash
            </label>
            <label className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === "credit"}
                onChange={() => setPaymentMethod("credit")}
                className="accent-emerald-500"
              />
              Credit
            </label>
          </div>
        </div>

        <Button
          className="bg-amber-500 hover:bg-amber-600 mt-2 w-full h-10 sm:h-11"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Checking...
            </>
          ) : (
            paymentMethod === "credit" ? "PAYNOW" : "PLACE ORDER"
          )}
        </Button>
        </form>
      </div>
    </div>
  );
}
