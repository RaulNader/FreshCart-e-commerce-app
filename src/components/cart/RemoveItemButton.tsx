import { cn } from "@/lib/utils";
import { Loader2, Trash2 } from "lucide-react";

interface RemoveItemButtonProps {
  disabled: boolean;
  isRemoving: boolean;
  onClick: () => void;
  className?: string;
}

export default function RemoveItemButton({
  disabled,
  isRemoving,
  onClick,
  className,
}: RemoveItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-xl text-red-500 hover:bg-mauve-200 p-1.5 disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {isRemoving ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          Remove
        </>
      )}
    </button>
  );
}
