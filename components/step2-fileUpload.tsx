"use client";
import React, { useState, useCallback } from 'react';
import {
    CardContent
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { FileText, Loader2, Trash2, Upload } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEdgeStore } from "@/lib/edgestore";
import {
    EdgeStoreApiClientError,
    UploadAbortedError,
} from "@edgestore/react/errors";
import { Progress } from './ui/progress';
import axios from 'axios';

interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

type FileProgressStatus = "pending" | "uploading" | "uploaded" | "error";

interface FileProgress {
  file: File;
  progress: number;
  status: FileProgressStatus;
  fileId?: string;
  fileUrl?: string;
}

interface FileProgressMap {
  [filename: string]: FileProgress;
}

const FileUpload: React.FC<StepProps> = ({ onNext, onBack }) => {
    const { edgestore } = useEdgeStore();
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileProgress, setFileProgress] = useState<FileProgressMap>({});
    const [fileIds, setFileIds] = useState<string[]>([]);

    const isValidFileType = (file: File) => {
        const validTypes = ["application/pdf"];
        return validTypes.includes(file.type);
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            isValidFileType
        );
        if (droppedFiles.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        }
    }, []);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsLoading(true);
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).filter(isValidFileType);
            if (files.length + newFiles.length > 50) {
                setError("Maximum number of files (50) exceeded.");
                return;
            }
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            const newFileIds: string[] = [];
            if (newFiles.length > 0) {
                try {
                    const uploadPromises = newFiles.map(async (file) => {
                        try {
                            const result = await edgestore.publicFiles.upload({
                                file,
                                onProgressChange: (progress) => {
                                    setFileProgress((prev) => ({
                                        ...prev,
                                        [file.name]: { file, progress, status: "uploading" },
                                    }));
                                },
                            });

                            const createFileResponse = await axios.post("/api/createTimelineFile", {
                                fileUrl: result.url,
                                filename: file.name,
                            });

                            console.log(createFileResponse.data.fileId);
                            const newFileId = createFileResponse.data.fileId;
                            newFileIds.push(newFileId);

                            setFileProgress((prev) => ({
                                ...prev,
                                [file.name]: { file, progress: 100, status: "uploaded" },
                            }));

                            return newFileId;
                        } catch (error) {
                            setFileProgress((prev) => ({
                                ...prev,
                                [file.name]: { file, progress: 0, status: "error" },
                            }));

                            if (error instanceof EdgeStoreApiClientError) {
                                setError(error.data.message || "An unknown error occurred");
                            } else if (error instanceof UploadAbortedError) {
                                setError("Upload aborted");
                            }
                            throw error;
                        }
                    });

                    try {
                        const results = await Promise.all(uploadPromises);
                        console.log('All files uploaded successfully:', results);
                    } catch (error) {
                        console.error('One or more uploads failed:', error);
                    }
                } catch (error) {
                    console.error("Error during file uploads:", error);
                    setError("An error occurred during file upload. Please try again.");
                }
            }
            setFileIds((prevFileIds) => [...prevFileIds, ...newFileIds]);
            console.log("file ids", fileIds);
        }
        setIsLoading(false);
    };

    const removeFile = async (index: number) => {
        console.log("index", index)

        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];

            newFiles.splice(index, 1);
            if (newFiles.length === 0) {
            }
            return newFiles;
        });
        setError(null);
    };

    return (
        <CardContent className="space-y-6">
            <div className="w-full flex flex-row space-x-4">
                <div
                    className={`w-1/2 h-80 border-2 border-dotted rounded-lg flex flex-col items-center justify-center p-4 transition-colors cursor-pointer
                ${isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }
              `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput")?.click()}
                >
                    <input
                        type="file"
                        id="fileInput"
                        accept="application/pdf"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-2">
                        <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 text-center font-semibold">
                        Drop files here, or click to select files
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Accepted file types: PDF
                    </p>
                    <p className="text-xs text-gray-400">Max number of files: 50</p>
                    <p className="text-xs text-gray-400">Max size per file: 100MB</p>
                </div>
                <div
                    className={`w-1/2 h-80 border-2 border-solid rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer
                ${isDragging
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }
              `}
                >
                    {files.length > 0 ? (
                        <ScrollArea className="h-80 w-full border rounded-lg">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                                >
                                    <div className="flex items-center space-x-2 flex-1">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm truncate">{file.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {fileProgress[file.name]?.status === "uploaded" ? (
                                                <span className="text-green-600 text-xs">✓</span>
                                            ) : (
                                                <Progress
                                                    value={fileProgress[file.name]?.progress || 0}
                                                    className="w-20 h-1"
                                                />
                                            )}
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                            Your files will show up here
                        </div>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-end space-x-1">
                <Button variant="outline" onClick={onBack} className="px-20 py-3">
                    Back
                </Button>
                <Button
                    onClick={onNext}
                    disabled={files.length === 0}
                    className="px-20 py-3"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        'Next'
                    )}
                </Button>
            </div>
        </CardContent>
    );
};

export default FileUpload;