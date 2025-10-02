/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Trash2, Upload } from "lucide-react";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "@/components/Services/Category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Category() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getAllCategory();
      setCategories(data?.data || []);
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      if (!f.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleCreate = async () => {
    const toastId = "creating";
    if (!name || !description || !file) {
      toast.error("Please provide name, description, and an icon", {
        id: toastId,
      });
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name, description }));
    formData.append("icon", file);
    try {
      setLoading(true);
      const newCategory = await createCategory(formData);
      setCategories((prev) => [...prev, newCategory.data]);
      setName("");
      setDescription("");
      setFile(null);
      setPreview(null);
      if (newCategory?.success) {
        toast.success(newCategory.message, { id: toastId });
      } else {
        toast.error(newCategory?.message || "Failed to create category", {
          id: toastId,
        });
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = `deleting-${id}`;
    try {
      setLoading(true);
      const res = await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      setSelectedCategory(null);
      toast.success(res?.message || "Category deleted successfully", {
        id: toastId,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete category";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 font-[Sansita]">
      {/* Create Category Section */}
      <div className="border-2 border-dashed border-amber-300 rounded-xl p-6 space-y-4 shadow-md bg-amber-50/30 hover:bg-amber-50 transition">
        <h2 className="text-xl font-bold text-amber-600">
          Create a New Category
        </h2>

        {/* Form Inputs */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-amber-300 focus:ring-amber-500"
            disabled={loading}
          />
          <Input
            type="text"
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-amber-300 focus:ring-amber-500"
            disabled={loading}
          />
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-100 transition">
            <Upload className="w-8 h-8 text-amber-500 mb-2" />
            <span className="text-sm text-gray-600">
              Click or drag icon to upload
            </span>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="relative w-64 h-40 border rounded-lg overflow-hidden shadow-sm">
              <Image
                src={preview}
                alt="Icon Preview"
                fill
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 bg-amber-600 hover:bg-amber-700"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
                disabled={loading}
              >
                <X size={16} />
              </Button>
            </div>
          )}

          {/* Create Button */}
          <Button
            onClick={handleCreate}
            disabled={!name || !description || !file || loading}
            className="px-5 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Category"}
          </Button>
        </div>
      </div>

      {/* Category List */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-amber-600">
          All Categories
        </h2>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories created yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div
                key={category._id}
                className="relative cursor-pointer border rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-lg transition"
                onClick={() => setSelectedCategory(category)}
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="object-cover w-full h-32"
                />
                <p className="text-center text-sm font-semibold text-amber-600 mt-2">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <Button
              size="icon"
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={() => setSelectedCategory(null)}
              disabled={loading}
            >
              <X size={18} />
            </Button>
            <div className="w-full h-[400px] relative">
              <Image
                src={selectedCategory.icon}
                alt={selectedCategory.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-bold text-amber-600">
                {selectedCategory.name}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedCategory.description}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => handleDelete(selectedCategory._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                disabled={loading}
              >
                <Trash2 size={16} /> {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
