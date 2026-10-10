import type { CartItem } from "@/types/cart.type";
import Image from "next/image";
import QuantityControl from "./QuantityControl";
import RemoveItemButton from "./RemoveItemButton";

export interface CartItemViewProps {
  item: CartItem;
  disabled: boolean;
  isUpdating: boolean;
  isRemoving: boolean;
  onUpdate: (productId: string, count: number) => void;
  onRemove: (productId: string) => void;
}

/** Table row for md+ screens. */
export function CartItemRow({
  item,
  disabled,
  isUpdating,
  isRemoving,
  onUpdate,
  onRemove,
}: CartItemViewProps) {
  const { product, count, price } = item;

  return (
    <tr className="border-b border-default hover:bg-neutral-secondary-medium">
      <td className="p-4">
        <Image
          className="w-16 md:w-20 max-w-full max-h-full"
          src={product.imageCover}
          alt={product.title}
          width={200}
          height={200}
        />
      </td>
      <td className="px-4 lg:px-6 py-4 font-semibold text-heading">
        {product.title}
      </td>
      <td className="px-4 lg:px-6 py-4">
        <QuantityControl
          count={count}
          disabled={disabled}
          isUpdating={isUpdating}
          onChange={(next) => onUpdate(product._id, next)}
        />
      </td>
      <td className="px-4 lg:px-6 py-4 font-semibold text-blue-500">
        {price} EGP
      </td>
      <td className="px-4 lg:px-6 py-4 font-semibold text-[#EFBF04]">
        {count * price} EGP
      </td>
      <td className="px-4 lg:px-6 py-4">
        <RemoveItemButton
          disabled={disabled}
          isRemoving={isRemoving}
          onClick={() => onRemove(product._id)}
          className="hover:underline disabled:hover:no-underline disabled:hover:bg-transparent"
        />
      </td>
    </tr>
  );
}

/** Stacked card for small screens. */
export function CartItemCard({
  item,
  disabled,
  isUpdating,
  isRemoving,
  onUpdate,
  onRemove,
}: CartItemViewProps) {
  const { product, count, price } = item;

  return (
    <div className="border border-default rounded-lg p-3 bg-white">
      <div className="flex items-start gap-3">
        <Image
          className="w-16 h-16 object-cover rounded-md"
          src={product.imageCover}
          alt={product.title}
          width={200}
          height={200}
        />
        <div className="flex-1">
          <p className="font-semibold text-heading line-clamp-2">
            {product.title}
          </p>
          <p className="text-blue-500 font-semibold">{price} EGP</p>
          <p className="text-[#EFBF04] font-medium text-sm">
            Amount: {count * price} EGP
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <QuantityControl
          count={count}
          disabled={disabled}
          isUpdating={isUpdating}
          onChange={(next) => onUpdate(product._id, next)}
        />
        <RemoveItemButton
          disabled={disabled}
          isRemoving={isRemoving}
          onClick={() => onRemove(product._id)}
          className="text-sm"
        />
      </div>
    </div>
  );
}
