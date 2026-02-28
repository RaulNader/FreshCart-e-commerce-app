import Image from "next/image";
import errorImage from "../assets/images/error.svg";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 p-6 text-center">
      <Image
        src={errorImage}
        alt="Page not found"
        loading="eager"
        className="w-full max-w-md h-auto"
      />
      <p className="text-lg font-semibold text-gray-700">
        Sorry, this page is not found.
      </p>
    </div>
  );
}
