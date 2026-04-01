import { cn } from "@/lib/client-utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "notice" | "ongoing" | "completed" | "category";
  className?: string;
}

const variants = {
  default: "bg-warm-gray-100 text-warm-gray-700",
  notice: "bg-red-100 text-red-700",
  ongoing: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  category: "bg-forest-100 text-forest-700",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
