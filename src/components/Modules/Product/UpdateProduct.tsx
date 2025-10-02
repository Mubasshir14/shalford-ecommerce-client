/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Color, Gender, Size } from "@/components/Types/Product";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "quill/dist/quill.snow.css";
import { getAllCategory } from "@/components/Services/Category";
import { updateProduct } from "@/components/Services/Product";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  description: string;
  category: string;
  gender: Gender;
  price: string;
  delPrice: string;
  stock: string;
  isFeatured: boolean;
  isOnSale: boolean;
  isActive: boolean;
}

interface UpdateProductProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    category: string;
    gender: Gender;
    size: Size[];
    color: Color[];
    price: number;
    delPrice: number;
    stock: number;
    isFeatured: boolean;
    isOnSale: boolean;
    isActive: boolean;
  };
}

export default function UpdateProduct({ product }: UpdateProductProps) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(product.images || []);
  const [categories, setCategories] = useState<any[]>([]);
  const [sizes, setSizes] = useState<Size[]>(product.size || []);
  const [colors, setColors] = useState<Color[]>(product.color || []);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      category: product.category || "",
      gender: product.gender,
      price: product.price?.toString() || "",
      delPrice: product.delPrice?.toString() || "",
      stock: product.stock?.toString() || "",
      isFeatured: product.isFeatured || false,
      isOnSale: product.isOnSale || false,
      isActive: product.isActive || true,
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getAllCategory();
        setCategories(data?.data || []);
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch categories", { id: "fetching-categories" });
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();

    return () => {
      imagePreview.forEach((preview) => {
        if (!product.images.includes(preview)) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [imagePreview, product.images]);

  const handleSizeChange = (size: Size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (color: Color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const renderHeader = () => (
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Bold" />
      <button className="ql-italic" aria-label="Italic" />
      <button className="ql-underline" aria-label="Underline" />
      <button className="ql-list" value="ordered" aria-label="Ordered List" />
      <button className="ql-list" value="bullet" aria-label="Bullet List" />
    </span>
  );

  const onSubmit = async (data: FormValues) => {
    const toastId = `updating-product-${product._id}`;
    if (sizes.length === 0) {
      toast.error("Please select at least one size", { id: toastId });
      return;
    }
    if (imagePreview.length === 0) {
      toast.error("Please upload at least one image", { id: toastId });
      return;
    }

    console.log("imageFiles:", imageFiles.map((f) => ({ name: f.name, size: f.size })));

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...data,
        size: sizes,
        color: colors.length > 0 ? colors.map((c) => c.toString()) : undefined,
        price: Number(data.price),
        delPrice: Number(data.delPrice),
        stock: Number(data.stock),
      })
    );
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await updateProduct(product._id, formData);
      if (res?.success) {
        toast.success(res?.message || "Product updated successfully", { id: toastId });
        router.push('/admin/dashboard/manage-product')
        reset({
          name: data.name,
          description: data.description,
          category: data.category,
          gender: data.gender,
          price: data.price,
          delPrice: data.delPrice,
          stock: data.stock,
          isFeatured: data.isFeatured,
          isOnSale: data.isOnSale,
          isActive: data.isActive,
        });
      }
    } catch (err: any) {
      const message =
        err?.message?.includes("duplicate")
          ? "Product name already exists"
          : err?.message || "Failed to update product";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-xl border rounded-xl my-10 bg-amber-50/30 font-[Sansita]">
      <h1 className="text-2xl font-bold mb-6 text-center text-amber-600">Update Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-amber-600">
            Product Name
          </label>
          <Input
            id="name"
            {...register("name", { required: "Product name is required", minLength: { value: 3, message: "Product name must be at least 3 characters" } })}
            placeholder="Enter product name"
            className={`border-amber-300 focus:ring-amber-500 rounded-lg ${errors.name ? "border-red-500" : ""}`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium text-amber-600">
            Description
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Editor
                value={field.value}
                onTextChange={(e) => {
                  field.onChange(e.htmlValue || "");
                  setValue("description", e.htmlValue || "", { shouldValidate: true });
                }}
                headerTemplate={renderHeader()}
                style={{ height: "320px" }}
                className={`border-2 ${errors.description ? "border-red-500" : "border-amber-300"} rounded-lg`}
                readOnly={isSubmitting}
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-amber-600">
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className={`w-full p-2 border-2 rounded-lg focus:ring-amber-500 focus:outline-none disabled:opacity-50 bg-white ${errors.category ? "border-red-500" : "border-amber-300"}`}
            disabled={isSubmitting || categoriesLoading || categories.length === 0}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="block mb-1 font-medium text-amber-600">
            Gender
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className={`w-full p-2 border-2 rounded-lg focus:ring-amber-500 capitalize focus:outline-none disabled:opacity-50 bg-white ${errors.gender ? "border-red-500" : "border-amber-300"}`}
            disabled={isSubmitting}
          >
            <option value="" disabled>Select Gender</option>
            {Object.values(Gender).map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-amber-600">
            Sizes (Select at least one)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Size).map((s) => (
              <label key={s} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={sizes.includes(s)}
                  onChange={() => handleSizeChange(s)}
                  disabled={isSubmitting}
                  className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600">{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-amber-600">
            Colors (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Color).map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={colors.includes(c)}
                  onChange={() => handleColorChange(c)}
                  disabled={isSubmitting}
                  className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600 capitalize">{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 font-medium text-amber-600">
            Price
          </label>
          <Input
            id="price"
            type="number"
            {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be non-negative" } })}
            placeholder="Enter price"
            className={`border-amber-300 focus:ring-amber-500 rounded-lg ${errors.price ? "border-red-500" : ""}`}
            disabled={isSubmitting}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="delPrice" className="block mb-1 font-medium text-amber-600">
            Discounted Price
          </label>
          <Input
            id="delPrice"
            type="number"
            {...register("delPrice", { required: "Discounted price is required", min: { value: 0, message: "Discounted price must be non-negative" } })}
            placeholder="Enter discounted price"
            className={`border-amber-300 focus:ring-amber-500 rounded-lg ${errors.delPrice ? "border-red-500" : ""}`}
            disabled={isSubmitting}
          />
          {errors.delPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.delPrice.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block mb-1 font-medium text-amber-600">
            Stock
          </label>
          <Input
            id="stock"
            type="number"
            {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be non-negative" } })}
            placeholder="Enter stock quantity"
            className={`border-amber-300 focus:ring-amber-500 rounded-lg ${errors.stock ? "border-red-500" : ""}`}
            disabled={isSubmitting}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isFeatured")}
              disabled={isSubmitting}
              className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-600">Is Featured</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isOnSale")}
              disabled={isSubmitting}
              className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-600">Is On Sale</span>
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isActive")}
              disabled={isSubmitting}
              className="h-4 w-4 border-amber-300 text-amber-600 focus:ring-amber-500"
            />
            <span className="text-sm text-gray-600">Is Active</span>
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium text-amber-600">Product Images (Max 5)</label>
          <div className="space-y-4">
            {imagePreview.length > 0 && (
              <ImagePreviewer
                imagePreview={imagePreview}
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                className="grid grid-cols-2 gap-4"
              />
            )}
            <NMImageUploader
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              label={`Upload Product Images (${imagePreview.length}/5)`}
              multiple
              currentImageCount={imagePreview.length}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || sizes.length === 0 || imagePreview.length === 0}
          className="w-full bg-amber-600 text-white hover:bg-amber-700 rounded-lg"
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}