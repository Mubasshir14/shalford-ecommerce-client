"use client";
import { getAllCategory } from "@/components/Services/Category";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  icon: string;
}

const HomeCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await getAllCategory();
        if (res.success) {
          setCategory(res.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 font-[Sansita]">
        <h2 className="text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center text-amber-700 tracking-wide">
          Featured Category
        </h2>
        <div className="flex items-center justify-center py-12 sm:py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">
              Loading categories...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mb-14 mx-auto px-4 sm:px-6 lg:px-8 font-[Sansita]">
      <h2 className="text-3xl font-bold mb-6 sm:mb-8 lg:mb-12 text-center text-amber-700 tracking-wide">
        Featured Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {category.slice(0, 12).map((c) => (
          <Link
            href={`/products?category=${encodeURIComponent(c._id)}`}
            key={c._id}
            className="group block"
          >
            <div className="text-center border border-amber-200 rounded-xl hover:shadow-xl hover:border-amber-400 transition-all duration-300 pt-6 px-6 shadow-sm">
              <div className="h-24 w-24 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-all duration-300">
                <Image
                  src={c.icon}
                  alt={`${c.name} icon`}
                  width={95}
                  height={95}
                  className="rounded-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-amber-700 group-hover:text-amber-800 transition-colors">
                {c.name}
              </h3>
              <ArrowRight className="w-4 h-4 text-amber-400 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300 mb-1" />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link
          href="/category"
          className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-lg h-8 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          See More Categories
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default HomeCategory;
