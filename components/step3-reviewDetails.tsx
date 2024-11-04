"use client";
import React from 'react';
import {
    CardContent
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

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

export default Review;