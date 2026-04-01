"use client";

import { cn } from "@/lib/client-utils";

interface CategoryTabsProps {
  categories: Record<string, string>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  allLabel?: string;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  allLabel = "전체",
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange("")}
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-full transition-colors",
          activeCategory === ""
            ? "bg-forest-700 text-white"
            : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-300/50"
        )}
      >
        {allLabel}
      </button>
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
            activeCategory === key
              ? "bg-forest-700 text-white"
              : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-300/50"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
