"use client";
import { FileText } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProgressComponentProps {
  caseid: string;
  name: string;
}

interface FileStatus {
  file_id: string;
  file_name: string;
  status: string;
}

interface WorkspaceStatus {
  workspace_id: string;
  workspace_url: string;
  status: string;
}

interface StatusResponse {
  workspace_status: WorkspaceStatus;
  file_statuses: FileStatus[];
}

const FILE_STATUSES = {
  PENDING: "Pending",
  TEXT_EXTRACTED: "Text Extracted",
  TEXT_SEGMENTED: "Text Segmented",
  TIMELINE_GENERATED: "Timeline Created",
} as const;

const WORKSPACE_STATUSES = {
  PENDING: "Pending",
  COMPLETED: "Completed",
} as const;

const ProgressComponent = ({ caseid, name }: ProgressComponentProps) => {
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([]);
  const [workspaceStatus, setWorkspaceStatus] =
    useState<WorkspaceStatus | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const calculateProgress = (
    files: FileStatus[],
    workspace: WorkspaceStatus | null
  ) => {
    if (!files.length) return 0;

    const fileProgress = files.map((file) => {
      switch (file.status) {
        case FILE_STATUSES.TIMELINE_GENERATED:
          return 90;
        case FILE_STATUSES.TEXT_SEGMENTED:
          return 60;
        case FILE_STATUSES.TEXT_EXTRACTED:
          return 30;
        case FILE_STATUSES.PENDING:
        default:
          return 15;
      }
    });

    const averageProgress =
      fileProgress.reduce((a, b) => a + b, 0) / files.length;

    return workspace?.status === WORKSPACE_STATUSES.COMPLETED
      ? 100
      : averageProgress;
  };

  const getProgress = async () => {
    console.log("Getting progress");
    console.log(workspaceStatus?.status);
    const response = await axios.post<StatusResponse>("/api/checkstatus", {
      workspace_id: caseid,
    });
    setFileStatuses(response.data.file_statuses);
    setWorkspaceStatus(response.data.workspace_status);
    setProgress(
      calculateProgress(
        response.data.file_statuses,
        response.data.workspace_status
      )
    );
    if (response.data.workspace_status.status === "Completed") {
      router.push(`/casetimeline/${caseid}`);
    }
  };

  useEffect(() => {
    getProgress();
    const interval = setInterval(getProgress, 5000);
    return () => clearInterval(interval);
  }, [caseid, getProgress]);

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="w-[500px]">
        <CardContent className="pt-6 flex flex-col items-center gap-4">
          <FileText
            className="text-muted-foreground w-24 h-24"
            strokeWidth={0.5}
          />
          <p className="text-muted-foreground">{name}</p>
          <Progress value={progress} className="w-full" />
          <p className="text-muted-foreground">
            This may take a few minutes. No need to stick around!
          </p>
        </CardContent>
        <CardFooter>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Filewise Progress</AccordionTrigger>
              {fileStatuses.map((file) => (
                <AccordionContent key={file.file_id}>
                  <div className="flex justify-between items-center">
                    <span>{file.file_name}</span>
                    <span className="text-muted-foreground">{file.status}</span>
                  </div>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProgressComponent;
