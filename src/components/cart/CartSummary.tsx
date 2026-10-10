import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
  cartId: string;
  totalPrice: number;
  disabled: boolean;
  isClearing: boolean;
  onClear: () => void;
}

export default function CartSummary({
  cartId,
  totalPrice,
  disabled,
  isClearing,
  onClear,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-default shadow-xs p-4 flex flex-col gap-4 lg:sticky lg:top-24">
      <h1 className="text-2xl font-bold text-heading">Summary</h1>
      <div className="rounded-lg border border-default p-4">
        <p className="text-sm text-muted-foreground">Total Price</p>
        <p className="mt-1 text-2xl font-bold text-heading">{totalPrice} EGP</p>
      </div>

      <div className="mt-auto space-y-2">
        <Button asChild className="w-full">
          <Link href={`/checkout/${cartId}`}>Check Out</Link>
        </Button>
        <Button
          onClick={onClear}
          disabled={disabled}
          className="w-full text-red-400 bg-transparent hover:bg-mauve-200"
          type="button"
        >
          {isClearing ? (
            <>
              <Loader2 className="animate-spin" />
              Clearing...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              Clear All Products
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
