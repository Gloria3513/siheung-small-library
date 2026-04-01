"use client";

import { Search } from "lucide-react";
import { useState, FormEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export default function SearchBar({
  placeholder = "검색어를 입력하세요",
  onSearch,
  defaultValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-warm-gray-300 bg-white
          text-warm-gray-700 placeholder:text-warm-gray-500
          focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500
          text-sm"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-500" />
    </form>
  );
}
