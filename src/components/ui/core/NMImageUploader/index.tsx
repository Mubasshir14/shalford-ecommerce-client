
"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
  currentImageCount: number;
};

const NMImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
  multiple = false,
  currentImageCount,
}: TImageUploader) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (multiple && files.length + currentImageCount > 5) {
      toast.error(`Maximum 5 images allowed. You can add ${5 - currentImageCount} more.`, {
        id: "image-limit",
      });
      return;
    }
    if (!multiple && files.length > 1) {
      toast.error("Only one image allowed", { id: "image-limit" });
      return;
    }
    if (files.some((f) => !f.type.startsWith("image/"))) {
      toast.error("Only image files are allowed", { id: "image-type" });
      return;
    }
    if (files.some((f) => f.size > 5 * 1024 * 1024)) {
      toast.error("Each image must be less than 5MB", { id: "image-size" });
      return;
    }
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreview((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={handleImageChange}
        disabled={multiple && currentImageCount >= 5}
      />
      <label
        htmlFor="image-upload"
        className={cn(
          "w-full h-36 flex items-center justify-center border-2 border-dashed border-amber-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-amber-50 transition",
          multiple && currentImageCount >= 5 ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default NMImageUploader;
