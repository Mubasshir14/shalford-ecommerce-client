/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, MoveLeftIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Color, Gender, Size } from "@/components/Types/Product";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/components/Services";
import { toast } from "sonner";
import { createCart } from "@/components/Services/Cart";
import { useUser } from "@/components/context/UserContext";
import ReviewSection from "../Review/ReviewSection";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

interface ProductDetailsProps {
  product: {
    _id: string;
    name: string;
    description: string;
    images: string[];
    category: { name: string };
    gender: Gender;
    size: Size[];
    color: Color[];
    price: number;
    delPrice: number;
    stock: number;
    isOnSale: boolean;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { user, setUser, isLoading, setIsLoading } = useUser();

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = async () => {
    const toastId = "creating-cart";
    try {
      if (!user) {
        toast.error("Please log in to add items to the cart.", { id: toastId });
        return;
      }
      if (user.role !== "user") {
        toast.error("You are not allowed to add items to the cart.", {
          id: toastId,
        });
        return;
      }

      if (!selectedSize) {
        toast.warning("Please select a size.", { id: toastId });
        return;
      }

      if (!selectedColor) {
        toast.warning("Please select a color.", { id: toastId });
        return;
      }

      const cartData = {
        product: product._id,
        size: selectedSize,
        color: selectedColor,
        price: product.price.toString(),
        quantity: quantity.toString(),
        totalPrice: (product.price * quantity).toString(),
      };
      const res = await createCart(cartData);

      if (res?.success) {
        toast.success("Product added to cart successfully!", { id: toastId });
        router.push("/cart");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to add product to cart", {
        id: toastId,
      });
      console.error(err);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/400x400"];

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 my-10 font-[Sansita] bg-white rounded-xl shadow-xl border border-amber-200">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 my-2 roup bg-gradient-to-b from-amber-50/30 to-white overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:text-amber-400"
      >
        <MoveLeftIcon /> Back To Previous
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section (Left) */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="flex justify-center items-center bg-white rounded-xl shadow-md border border-amber-200 p-4">
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg object-cover w-[400px] h-[400px]"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex justify-center gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-md p-1 transition-all duration-300 ${
                    index === currentImageIndex
                      ? "border-amber-600"
                      : "border-amber-200"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section (Right) */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-amber-700">{product.name}</h1>

          {/* Price and Stock */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-amber-600">
                ৳{product.price.toFixed(2)}
              </span>
              {product.isOnSale && (
                <span className="text-lg text-gray-500 line-through">
                  ৳{product.delPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-gray-600">
              Stock: {product.stock}{" "}
              {product.stock > 0 ? "(Available)" : "(Out of Stock)"}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-amber-600">
              Description
            </h2>
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-amber-600">Details</h2>
            <p className="text-gray-700">Category: {product.category.name}</p>
            <p className="text-gray-700 capitalize">Gender: {product.gender}</p>
            <p className="text-gray-700">
              {/* Sizes: {product.size.join(", ") || "None"} */}
              <div className="flex flex-wrap gap-2">
                {product.size && product.size.length > 0 ? (
                  product.size.map((s: string) => (
                    <Button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-lg border 
                  ${
                    selectedSize === s
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white text-amber-700 border-amber-300 hover:bg-amber-100"
                  }`}
                    >
                      {s}
                    </Button>
                  ))
                ) : (
                  <p className="text-gray-500">No sizes available</p>
                )}
              </div>
            </p>
            {/* Color Selectro */}
            <p className="text-gray-700 capitalize">
              <div className="flex flex-wrap gap-2">
                {product.color && product.color.length > 0 ? (
                  product.color.map((c: string) => (
                    <Button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-10 h-10 rounded-full border-2 transition-transform
                  ${
                    selectedColor === c
                      ? "ring-2 ring-offset-2 ring-amber-500 scale-110"
                      : "hover:scale-105"
                  }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))
                ) : (
                  <p className="text-gray-500">No colors available</p>
                )}
              </div>
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium text-amber-600">Quantity:</span>
            <div className="flex items-center border border-amber-300 rounded-lg overflow-hidden">
              <Button
                onClick={handleDecrease}
                className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </Button>
              <span className="px-5 text-lg font-semibold text-amber-700">
                {quantity}
              </span>
              <Button
                onClick={handleIncrease}
                className="px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700"
                disabled={quantity >= product.stock}
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg px-6 py-3 rounded-lg shadow-md"
            disabled={
              isLoading ||
              product.stock === 0 ||
              !selectedSize ||
              !selectedColor
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Review Section */}
      <div className=" p-6">
        <ReviewSection productId={product._id} />
      </div>
      <div className=" p-6">
        <RelatedProduct category={product.category.name} />
      </div>
    </div>
  );
}
