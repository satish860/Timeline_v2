"use client";
import React, { useState } from 'react';
import {
    Card,
    CardHeader,
} from "@/components/ui/card"
import TimelineDetails from '@/components/step1-timelineDetails';
import FileUpload from '@/components/step2-fileUpload';
import Review from '@/components/step3-reviewDetails';

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