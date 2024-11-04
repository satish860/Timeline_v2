"use client";
import PdfViewer from "./PdfViewer";
import { DataTable } from "./Table/data-table";
import { columns } from "@/components/TimelineTable/columns";
import { useState, useEffect } from "react";
import { TimelineEvent } from "@/src/types";

interface TableComponentProps {
  data: TimelineEvent[];
  pdfUrl: string;
}

const TimelineTable: React.FC<TableComponentProps> = ({ data, pdfUrl }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [initialPage, setInitialPage] = useState(1);

  useEffect(() => {
    const handleShowPdf = (
      event: CustomEvent<{ url: string; page: number }>
    ) => {
      setInitialPage(event.detail.page);
      setShowPdf(true);
    };
    window.addEventListener("showPdf", handleShowPdf as EventListener);
    return () => {
      window.removeEventListener("showPdf", handleShowPdf as EventListener);
    };
  }, []);

  return (
    <div className="flex gap-4 h-[calc(90vh-4rem)]">
      <div className={`${showPdf ? "w-1/2" : "w-full"} overflow-auto`}>
        <DataTable columns={columns} data={data} />
      </div>
      {showPdf && (
        <div className="w-1/2 overflow-auto custom-scrollbar">
          <PdfViewer
            pdfUrl={pdfUrl}
            initialPage={initialPage}
          />
        </div>
      )}
    </div>
  );
};

export default TimelineTable;
