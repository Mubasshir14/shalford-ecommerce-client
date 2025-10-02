
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type TImagePreviewer = {
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imagePreview: string[];
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};

const ImagePreviewer = ({
  setImageFiles,
  imagePreview,
  setImagePreview,
  className,
}: TImagePreviewer) => {
  const handleRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreview((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  return (
    <div className={className}>
      {imagePreview.map((preview, index) => (
        <div
          key={index}
          className="relative w-36 h-36 rounded-md overflow-hidden border border-dashed border-amber-300"
        >
          <Image
            src={preview}
            alt={`Preview ${index + 1}`}
            fill
            className="object-cover"
          />
          <Button
            type="button"
            size="sm"
            onClick={() => handleRemove(index)}
            className="bg-amber-600 hover:bg-amber-700 absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
