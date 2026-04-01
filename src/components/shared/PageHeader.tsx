import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="bg-forest-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {description && (
          <p className="mt-2 text-forest-300 text-sm md:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
