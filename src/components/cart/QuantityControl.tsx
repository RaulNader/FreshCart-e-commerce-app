import { Loader2, Minus, Plus } from "lucide-react";

const buttonClass =
  "hover:bg-emerald-100 flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6 disabled:opacity-50 disabled:cursor-not-allowed";

interface QuantityControlProps {
  count: number;
  disabled: boolean;
  isUpdating: boolean;
  onChange: (count: number) => void;
}

export default function QuantityControl({
  count,
  disabled,
  isUpdating,
  onChange,
}: QuantityControlProps) {
  return (
    <div className="relative flex items-center w-fit">
      <button
        type="button"
        onClick={() => onChange(count - 1)}
        disabled={disabled || count <= 1}
        className={buttonClass}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3 h-3 text-heading" aria-hidden="true" />
      </button>

      {isUpdating ? (
        <Loader2 className="mx-2 animate-spin" />
      ) : (
        <span className="mx-2 rounded-xl p-1.5 bg-mauve-200">{count}</span>
      )}

      <button
        type="button"
        onClick={() => onChange(count + 1)}
        disabled={disabled}
        className={buttonClass}
        aria-label="Increase quantity"
      >
        <Plus className="w-3 h-3 text-heading" aria-hidden="true" />
      </button>
    </div>
  );
}
