"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

type RemoveBtnProps = {
  id: string;
  disabled?: boolean;
  className?: string;
  onRemove: (id: string) => Promise<void>;
};

export default function RemoveBtn({
  id,
  disabled = false,
  className,
  onRemove,
}: RemoveBtnProps) {
  const [disabledBtn, setDisabledBtn] = useState(false);

  async function handleRemove() {
    if (disabled || disabledBtn) return;

    setDisabledBtn(true);
    try {
      await onRemove(id);
    } finally {
      setDisabledBtn(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={disabled || disabledBtn}
      className={className}
      aria-busy={disabledBtn}
    >
      {disabledBtn ? <Loader2 className="animate-spin" /> : "Remove"}
    </button>
  );
}
