"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { checkoutSchema, type CheckoutValues } from "@/schemas/checkout.schema";
import { placeOrder } from "@/actions/checkout.actions";
import { useCart } from "@/context/CartContext";
import type { PaymentMethod } from "@/types/order.type";

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "Cash" },
  { value: "credit", label: "Credit" },
];

const fieldStyles = {
  fieldClassName: "data-[invalid=true]:text-red-300",
  inputClassName: "text-black h-10 sm:h-11",
  errorClassName: "text-red-300",
};

export default function CheckOut() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { setNumOfItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CheckoutValues>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
  });

  async function handleCheckOut(values: CheckoutValues) {
    try {
      const res = await placeOrder(id, values, paymentMethod);

      if (!res.ok) {
        toast.error(res.message);
        return;
      }

      const paymentUrl = res.data;
      if (paymentUrl) {
        toast.success("Redirecting you to credit payment");
        window.location.assign(paymentUrl);
        return;
      }

      toast.success("Cash order is placed successfully");
      setNumOfItems(0);
      router.push("/allorders");
    } catch {
      toast.error("Something went wrong please try again later");
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-5 my-6 sm:my-10">
      <div className="text-white bg-teal-800 border border-teal-700 p-4 sm:p-6 md:p-8 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl text-center text-white font-bold mb-4 sm:mb-6">
          CheckOut
        </h1>

        <form onSubmit={handleSubmit(handleCheckOut)} className="space-y-4">
          <FormInput
            control={control}
            name="details"
            label="Details"
            placeholder="Enter your Details"
            {...fieldStyles}
          />
          <FormInput
            control={control}
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="Enter your Phone Number"
            {...fieldStyles}
          />
          <FormInput
            control={control}
            name="city"
            label="City"
            placeholder="Enter your City"
            {...fieldStyles}
          />

          <div className="pt-1">
            <p className="font-semibold mb-2">Payment Method</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              {PAYMENT_METHODS.map(({ value, label }) => (
                <label
                  key={value}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-3 py-2"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={() => setPaymentMethod(value)}
                    className="accent-emerald-500"
                  />
                  {label}
                </label>
              ))}
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
            ) : paymentMethod === "credit" ? (
              "PAYNOW"
            ) : (
              "PLACE ORDER"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
