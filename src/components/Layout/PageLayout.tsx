"use client";
import React from "react";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className=" font-arima ">
      {/* Page Title Section */}
      <div className="pt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-700 text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
