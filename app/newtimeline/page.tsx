import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
    return (
        <div className=" flex items-center justify-center min-h-80">
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-center mb-6">
                        {/* Step 1 with line */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium shadow-sm">
                                    1
                                </div>
                                <span className="font-medium text-foreground pr-4">Timeline Details</span>
                            </div>
                            <div className="h-[2px] bg-border w-[100px]"></div>
                        </div>

                        {/* Step 2 with line */}
                        <div className="flex items-center">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-background text-muted-foreground font-medium shadow-sm">
                                    2
                                </div>
                                <span className="text-muted-foreground pr-4">Upload Files</span>
                            </div>
                            <div className="h-[2px] bg-border w-[100px]"></div>
                        </div>

                        {/* Step 3 - no line after */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-background text-muted-foreground font-medium shadow-sm">
                                3
                            </div>
                            <span className="text-muted-foreground">Review & Submit</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="chronology-name" className="text-base text-gray-700">
                            Enter the case name
                        </label>
                        <Input id="chronology-name" placeholder="Chronology name" className="w-full" />
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
                        <Button >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}