"use client";
import React, { useState } from "react";
import { CardContent, Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface StepProps {
  onNext: () => void;
  onBack?: () => void;
}

interface TimelineDetailsProps extends StepProps {
  timelineData: {
    caseName: string;
    areaOfLaw: string;
    recId?: string;
  };
  setTimelineData: (data: {
    caseName: string;
    areaOfLaw: string;
    recId?: string;
  }) => void;
  onCreateCase: (data: {
    caseName: string;
    areaOfLaw: string;
  }) => Promise<string>;
}

const TimelineDetails: React.FC<TimelineDetailsProps> = ({
  onNext,
  onBack,
  timelineData,
  setTimelineData,
  onCreateCase,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onCreateCase({
        caseName: timelineData.caseName,
        areaOfLaw: timelineData.areaOfLaw,
      });
      onNext();
    } catch (error) {
      console.error("Error creating case:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <CardContent className="w-full max-w-xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="case-name" className="font-semibold">
            Enter the case name
          </label>
          <Input
            id="case-name"
            value={timelineData.caseName}
            onChange={(e) =>
              setTimelineData({ ...timelineData, caseName: e.target.value })
            }
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
              <SelectItem value="intellectual-property">
                Intellectual Property
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || timelineData.caseName.trim() === ""}
            className="px-20 py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default TimelineDetails;
