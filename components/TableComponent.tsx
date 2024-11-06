"use client";
import PdfViewer from "./PdfViewer";
import { DataTable } from "./Table/data-table";
import { columns } from "@/components/TimelineTable/columns";
import { useState, useEffect } from "react";
import { TimelineEvent, FileUrls } from "@/src/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableComponentProps {
  data: TimelineEvent[];
  pdfUrls: FileUrls;
  id: string;
}

const TimelineTable: React.FC<TableComponentProps> = ({ data, pdfUrls, id }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [initialPage, setInitialPage] = useState<number>(1);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string>("");

  useEffect(() => {
    const handleShowPdf = (
      event: CustomEvent<{ fileName: string; page: number }>
    ) => {
      const pdfUrl = pdfUrls[event.detail.fileName];
      if (pdfUrl) {
        setCurrentPdfUrl(pdfUrl);
        setInitialPage(event.detail.page);
        setShowPdf(true);
      }
    };
    window.addEventListener("showPdf", handleShowPdf as EventListener);
    return () => {
      window.removeEventListener("showPdf", handleShowPdf as EventListener);
    };
  }, [pdfUrls]);

  return (
    <div className="flex gap-6 h-[calc(90vh-4rem)]">
      <div className={`${showPdf ? "w-1/2" : "w-full"} overflow-auto`}>
        <DataTable
          columns={columns}
          data={data}
          placeholder="Filter by event..."
          columnName="event"
          id={id}
        />
      </div>
      {showPdf && (
        <div className="w-1/2">
          <div className="flex justify-end p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPdf(false)}
              className="gap-2"
              aria-label="Close PDF viewer"
            >
              <X className="h-4 w-4" />
              <span>Close PDF</span>
            </Button>
          </div>
          <div className="p-4">
            <PdfViewer pdfUrl={currentPdfUrl} initialPage={initialPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineTable;
