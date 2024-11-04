"use client";
import React from 'react';
import {
    CardContent
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

interface FileData {
    file: File;
    fileId: string;
    fileUrl: string;
}

interface ReviewProps extends StepProps {
    timelineData: {
        caseName: string;
        areaOfLaw: string;
        recId?: string;
    };
    uploadedFiles: FileData[];
}

const Review: React.FC<ReviewProps> = ({ 
    onBack, 
    timelineData,
    uploadedFiles
}) => {
    const handleSubmit = () => {
        console.log('Form submitted');
    };

    const formatAreaOfLaw = (area: string) => {
        return area.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-medium text-lg">Review Your Information</h3>
                
                {/* Case Details Section */}
                <div className="space-y-4 border rounded-lg p-4">
                    <h4 className="font-medium">Case Details</h4>
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-sm text-gray-500">Case Name:</p>
                            <p className="text-sm font-medium">{timelineData.caseName}</p>
                            
                            <p className="text-sm text-gray-500">Area of Law:</p>
                            <p className="text-sm font-medium">{formatAreaOfLaw(timelineData.areaOfLaw)}</p>
                            
                        </div>
                    </div>
                </div>

                {/* Files Section */}
                <div className="space-y-4 border rounded-lg p-4">
                    <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
                    <ScrollArea className="h-[200px] w-full rounded-md border">
                        {uploadedFiles.map((fileData, index) => (
                            <div 
                                key={fileData.fileId} 
                                className="flex items-center space-x-3 p-3 hover:bg-gray-50"
                            >
                                <FileText className="h-4 w-4 text-gray-400" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">{fileData.file.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </CardContent>
    );
};

export default Review;