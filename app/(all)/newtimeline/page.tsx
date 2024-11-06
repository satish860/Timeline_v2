"use client";
import React, { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import TimelineDetails from "@/components/step1-timelineDetails";
import FileUpload from "@/components/step2-fileUpload";
import Review from "@/components/step3-reviewDetails";
import { useUser } from "@stackframe/stack";
import axios from "axios";

interface TimelineFormData {
  caseName: string;
  areaOfLaw: string;
  recId?: string;
}

interface FileData {
  file: File;
  fileId: string;
  fileUrl: string;
}

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timelineData, setTimelineData] = useState<TimelineFormData>({
    caseName: "",
    areaOfLaw: "",
    recId: undefined,
  });
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const user = useUser({ or: "redirect" });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleCreateCase = async (data: {
    caseName: string;
    areaOfLaw: string;
  }) => {
    try {
      const response = await fetch("/api/createCasename", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          user_id: user.id,
          user_name: user.displayName,
          user_email: user.primaryEmail,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setTimelineData((prev) => ({ ...prev, recId: responseData.recId }));
      return responseData.recId;
    } catch (error) {
      console.error("Error creating case:", error);
      throw error;
    }
  };

  const handleFileUploadNext = async (
    files: File[],
    fileIds: string[],
    fileUrls: string[]
  ) => {
    try {
      const filesData: FileData[] = files.map((file, index) => ({
        file,
        fileId: fileIds[index],
        fileUrl: fileUrls[index],
      }));
      setUploadedFiles(filesData);

      const caseId = timelineData.recId || "";
      console.log("caseId", caseId);

      const fileResults = await Promise.all(
        fileIds.map(async (fileId) => {
          try {
            const data = await axios.post("/api/workflow", {
              id: fileId,
              workspace_id: caseId,
            });

            console.log(`File ${fileId} workflow started:`, data);
            return { success: true, fileId, data: data };
          } catch (error) {
            console.error(`Error processing file ${fileId}:`, error);
            return { success: false, fileId, error };
          }
        })
      );

      const failedFiles = fileResults.filter((result) => !result.success);
      if (failedFiles.length > 0) {
        console.error("Some files failed to process:", failedFiles);
      }

      const successfulFiles = fileResults.filter((result) => result.success);
      console.log("Successfully processed files:", successfulFiles);

      setCurrentStep(currentStep + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Workflow API error:",
          error.response?.data || error.message
        );
        // You might want to show an error message to the user here
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-80">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1 z-10">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground border"
                } font-medium shadow-sm`}
              >
                1
              </div>
              <span
                className={
                  currentStep >= 1
                    ? "font-medium text-foreground pr-4"
                    : "text-muted-foreground pr-4"
                }
              >
                Timeline Details
              </span>
              <div className="h-[2px] bg-border w-[100px]"></div>
            </div>

            <div className="flex items-center gap-1 z-10">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground border"
                } font-medium shadow-sm`}
              >
                2
              </div>
              <span
                className={
                  currentStep >= 2
                    ? "font-medium text-foreground pr-4"
                    : "text-muted-foreground pr-4"
                }
              >
                Upload Files
              </span>
              <div className="h-[2px] bg-border w-[100px]"></div>
            </div>

            <div className="flex items-center gap-1 z-10">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground border"
                } font-medium shadow-sm`}
              >
                3
              </div>
              <span
                className={
                  currentStep >= 3
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }
              >
                Review & Submit
              </span>
            </div>
          </div>
        </CardHeader>

        {currentStep === 1 && (
          <TimelineDetails
            onNext={handleNext}
            timelineData={timelineData}
            setTimelineData={setTimelineData}
            onCreateCase={handleCreateCase}
          />
        )}
        {currentStep === 2 && (
          <FileUpload
            onNext={handleFileUploadNext}
            onBack={() => setCurrentStep(currentStep - 1)}
            recId={timelineData.recId}
          />
        )}
        {currentStep === 3 && (
          <Review
            onNext={handleNext}
            onBack={() => setCurrentStep(currentStep - 1)}
            timelineData={timelineData}
            uploadedFiles={uploadedFiles}
          />
        )}
      </Card>
    </div>
  );
};

export default Page;
