import { Download, FileText } from "lucide-react";
import { formatFileSize } from "@/lib/client-utils";

interface FileDownloadItemProps {
  fileName: string;
  fileUrl: string;
  fileSize: number;
  downloadCount?: number;
}

export default function FileDownloadItem({
  fileName,
  fileUrl,
  fileSize,
  downloadCount,
}: FileDownloadItemProps) {
  return (
    <a
      href={fileUrl}
      download
      className="flex items-center justify-between p-3 rounded-lg border border-warm-gray-300/50 bg-warm-gray-100/30 hover:bg-warm-gray-100 transition-colors group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <FileText className="w-5 h-5 text-forest-700 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-warm-gray-700 truncate">
            {fileName}
          </p>
          <p className="text-xs text-warm-gray-500">
            {formatFileSize(fileSize)}
            {downloadCount !== undefined && ` | 다운로드 ${downloadCount}회`}
          </p>
        </div>
      </div>
      <Download className="w-4 h-4 text-warm-gray-400 group-hover:text-forest-700 shrink-0 ml-2" />
    </a>
  );
}
