"use client";
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

const TimelineDetails: React.FC<StepProps> = ({ onNext }) => {
    return (
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="case-name" className="text-base text-gray-700">
                    Enter the case name
                </label>
                <Input 
                    id="case-name" 
                    placeholder="Case name" 
                    className="w-full"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="area-of-law" className="text-base text-gray-700">
                    Area of Law
                </label>
                <Select>
                    <SelectTrigger id="area-of-law">
                        <SelectValue placeholder="Please select an option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="criminal">Criminal Law</SelectItem>
                        <SelectItem value="civil">Civil Law</SelectItem>
                        <SelectItem value="corporate">Corporate Law</SelectItem>
                        <SelectItem value="family">Family Law</SelectItem>
                        <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end pt-4">
                <Button onClick={onNext}>
                    Next
                </Button>
            </div>
        </CardContent>
    );
};

const FileUpload: React.FC<StepProps> = ({ onNext, onBack }) => {
    return (
        <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your files here or</p>
                    <Button variant="outline" className="mt-2">Browse Files</Button>
                </div>
            </div>
            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext}>
                    Next
                </Button>
            </div>
        </CardContent>
    );
};

const Review: React.FC<Omit<StepProps, 'onNext'>> = ({ onBack }) => {
    const handleSubmit = () => {
        console.log('Form submitted');
    };

    return (
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-medium text-lg">Review Your Information</h3>
                <div className="space-y-2">
                    <p className="text-gray-600">Please review your information before submitting</p>
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

const Page: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="flex items-center justify-center min-h-80">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1 z-10">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground border'} font-medium shadow-sm`}>
                                1
                            </div>
                            <span className={currentStep >= 1 ? 'font-medium text-foreground pr-4' : 'text-muted-foreground pr-4'}>Timeline Details</span>
                            <div className="h-[2px] bg-border w-[100px]"></div>
                        </div>

                        <div className="flex items-center gap-1 z-10">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground border'} font-medium shadow-sm`}>
                                2
                            </div>
                            <span className={currentStep >= 2 ? 'font-medium text-foreground pr-4' : 'text-muted-foreground pr-4'}>Upload Files</span>
                            <div className="h-[2px] bg-border w-[100px]"></div>
                        </div>

                        <div className="flex items-center gap-1 z-10">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-background text-muted-foreground border'} font-medium shadow-sm`}>
                                3
                            </div>
                            <span className={currentStep >= 3 ? 'font-medium text-foreground' : 'text-muted-foreground'}>Review & Submit</span>
                        </div>
                    </div>
                </CardHeader>
                
                {currentStep === 1 && (
                    <TimelineDetails onNext={handleNext} />
                )}
                {currentStep === 2 && (
                    <FileUpload onNext={handleNext} onBack={handleBack} />
                )}
                {currentStep === 3 && (
                    <Review onBack={handleBack} />
                )}
            </Card>
        </div>
    );
}

export default Page;