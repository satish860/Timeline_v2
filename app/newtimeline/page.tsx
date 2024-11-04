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
                    <div className="flex items-center justify-between mb-6 relative">
                        <div className="flex items-center gap-1 z-10">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-black font-bold">
                                1
                            </div>
                            <span className=" font-bold text-black">Timeline Details</span>
                        </div>
                        <div className="flex items-center gap-1 z-10">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-medium">
                                2
                            </div>
                            <span className="text-gray-400">Upload Files</span>
                        </div>
                        <div className="flex items-center gap-1 z-10">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 font-medium">
                                3
                            </div>
                            <span className="text-gray-400">Review & Submit</span>
                        </div>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2"></div>
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