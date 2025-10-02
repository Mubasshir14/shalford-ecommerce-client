/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  createPopup,
  deletePopup,
  getAllPopups,
} from "@/components/Services/Popup";

export default function Popup() {
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<any | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const data = await getAllPopups();
      setNewsletter(data?.data || []);
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async () => {
    const toastId = "creating";
    if (!file) {
      toast.error("Please select an image to upload", { id: toastId });
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: "Hellow",
        link: link, 
      })
    );
    formData.append("image", file);

    try {
      setLoading(true);
      const newBanner = await createPopup(formData);

      setNewsletter((prev) => [...prev, newBanner.data]);
      setFile(null);
      setPreview(null);
      setLink("");

      if (newBanner?.success) {
        toast.success(newBanner.message, { id: toastId });
      } else {
        toast.error(newBanner?.message || "Failed to upload banner", {
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
      const res = await deletePopup(id);
      toast.success(res?.message || "Banner deleted successfully", {
        id: toastId,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete banner";
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 font-[Sansita]">
      {/* Upload Section */}
      <div className="border-2 border-dashed border-amber-300 rounded-xl p-6 space-y-4 shadow-md bg-amber-50/30 hover:bg-amber-50 transition">
        <h2 className="text-xl font-bold text-amber-600">Upload a New Popup</h2>

        {/* File Input */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-100 transition">
          <Upload className="w-8 h-8 text-amber-500 mb-2" />
          <span className="text-sm text-gray-600">
            Click or drag file to upload
          </span>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <label className="">
          <span className="text-sm text-gray-600">Directed Link</span>
          <Input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter directed link"
            className="border-2 border-dashed border-amber-300 rounded-lg cursor-pointer bg-white hover:bg-amber-100 transition mb-2"
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="relative w-64 h-40 border rounded-lg overflow-hidden shadow-sm">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 bg-amber-600 hover:bg-amber-700"
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}
            >
              <X size={16} />
            </Button>
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          className="px-5 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Popup"}
        </Button>
      </div>

      {/* Banner List */}
      <div>
        <h2 className="text-xl font-bold mb-3 text-amber-600">
          All Uploaded popup
        </h2>
        {newsletter.length === 0 ? (
          <p className="text-sm text-gray-500">No popup uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newsletter.map((banner) => (
              <div
                key={banner._id}
                className="relative cursor-pointer border rounded-lg overflow-hidden shadow-md hover:scale-105 hover:shadow-lg transition"
                onClick={() => setSelectedNewsletter(banner)}
              >
                <Image
                  src={banner.image}
                  alt="Banner"
                  width={300}
                  height={200}
                  className="object-cover w-full h-32"
                />
                <p className="text-amber-700">{banner?.link}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {selectedNewsletter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <Button
              size="icon"
              className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={() => setSelectedNewsletter(null)}
            >
              <X size={18} />
            </Button>
            <div className="w-full h-[400px] relative">
              <Image
                src={selectedNewsletter.image}
                alt="Newsletter Preview"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => handleDelete(selectedNewsletter._id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 size={16} /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
