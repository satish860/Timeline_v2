"use client";
import React, { useState } from 'react';
import {
    CardContent
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface StepProps {
    onNext: () => void;
    onBack?: () => void;
}

const TimelineDetails: React.FC<StepProps> = ({ onNext }) => {
    const [caseName, setCaseName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/createCasename', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    caseName,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            
            onNext();

        } catch (error) {
            console.error('Error creating case:', error);
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="case-name" className="font-semibold">
                    Enter the case name
                </label>
                <Input
                    id="case-name"
                    value={caseName}
                    onChange={(e) => setCaseName(e.target.value)}
                    placeholder="Case name"
                    className="w-full"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="area-of-law" className="font-semibold">
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
            <Button 
                    onClick={handleSubmit}
                    disabled={isLoading || caseName.trim() === ""}
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

export default TimelineDetails;