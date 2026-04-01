import { Loader2 } from "lucide-react";
import { cn } from "@/lib/client-utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  className,
  text,
}: LoadingSpinnerProps) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };

  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <Loader2 className={cn("animate-spin text-forest-700", sizes[size])} />
      {text && <p className="mt-3 text-sm text-warm-gray-500">{text}</p>}
    </div>
  );
}
