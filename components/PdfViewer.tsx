"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false }
);

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

interface PDFProps {
  pdfUrl: string;
  initialPage?: number;
}

export const PdfViewer: React.FC<PDFProps> = ({ pdfUrl, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage - 1);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage } = pageNavigationPluginInstance;
  jumpToPage(currentPage);

  useEffect(() => {
    setCurrentPage(initialPage - 1);
  }, [initialPage]);

  if (!pdfUrl) {
    return <div className="error-message">No PDF URL provided</div>;
  }

  return (
    <div className="pdf-viewer-container h-[calc(100vh-100px)] overflow-auto">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <Viewer
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
          enableSmoothScroll={true}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
