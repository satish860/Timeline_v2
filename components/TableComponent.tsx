"use client";
import PdfViewer from "./PdfViewer";
import { DataTable } from "./Table/data-table";
import { columns } from "@/components/TimelineTable/columns";
import { useState, useEffect } from "react";
import { TimelineEvent } from "@/src/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TableComponentProps {
  data: TimelineEvent[];
  pdfUrl: string;
}

const TimelineTable: React.FC<TableComponentProps> = ({ data, pdfUrl }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [initialPage, setInitialPage] = useState<number>(1);

  useEffect(() => {
    const handleShowPdf = (
      event: CustomEvent<{ url: string; page: number }>
    ) => {
      setShowPdf(true);
      setInitialPage(event.detail.page);
    };
    window.addEventListener("showPdf", handleShowPdf as EventListener);
    return () => {
      window.removeEventListener("showPdf", handleShowPdf as EventListener);
    };
  }, []);

  return (
    <div className="flex gap-6 h-[calc(90vh-4rem)]">
      <div className={`${showPdf ? "w-1/2" : "w-full"} overflow-auto`}>
        <DataTable
          columns={columns}
          data={data}
          placeholder="Filter by event..."
          columnName="event"
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
            <PdfViewer pdfUrl={pdfUrl} initialPage={initialPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineTable;
