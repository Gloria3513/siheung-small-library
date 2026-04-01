import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { Library } from "@/types";
import Card from "@/components/ui/Card";

interface LibraryCardProps {
  library: Library;
}

export default function LibraryCard({ library }: LibraryCardProps) {
  return (
    <Link href={`/libraries/${library.id}`}>
      <Card className="h-full">
        <div className="h-44 bg-gradient-to-br from-forest-100 to-forest-300/50 rounded-t-xl flex items-center justify-center">
          {library.imageUrl ? (
            <img
              src={library.imageUrl}
              alt={library.name}
              className="w-full h-full object-cover rounded-t-xl"
            />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-warm-gray-700 mb-3">
            {library.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-warm-gray-500">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-forest-500" />
              <span className="line-clamp-1">{library.address}</span>
            </div>
            {library.hours && (
              <div className="flex items-start gap-2 text-sm text-warm-gray-500">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-forest-500" />
                <span className="line-clamp-1">{library.hours}</span>
              </div>
            )}
            {library.phone && (
              <div className="flex items-start gap-2 text-sm text-warm-gray-500">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-forest-500" />
                <span>{library.phone}</span>
              </div>
            )}
          </div>
          {library.specialProgram && (
            <div className="mt-4 flex flex-wrap gap-1">
              {library.specialProgram.split(", ").map((prog) => (
                <span
                  key={prog}
                  className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full"
                >
                  {prog}
                </span>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
