"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { DataTableColumnHeader } from "@/components/Table/data-table-column-header";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

export const TimelineEventSchema = z.object({
  original_dates: z.array(z.string()),
  event: z.string(),
  sources: z.array(
    z.object({
      file_name: z.string(),
      page_numbers: z.array(z.number()),
    })
  ),
});

export type TimelineEvent = z.infer<typeof TimelineEventSchema>;

export const columns: ColumnDef<TimelineEvent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "original_dates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "event",
    header: "Event",
  },
  {
    accessorKey: "sources",
    header: "Ref Document",
    cell: ({ row }) => {
      const sources =
        (row.getValue("sources") as {
          file_name: string;
          page_numbers: number[];
        }[]) || [];
      return sources.map((source, idx) => (
        <div key={idx} className="text-sm text-muted-foreground">
          <div>{source.file_name}</div>
          <div className="text-xs">
            Page.{" "}
            {source.page_numbers.map((pageNum, pageIdx) => (
              <React.Fragment key={pageIdx}>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("showPdf", {
                        detail: {
                          fileName: source.file_name,
                          page: pageNum,
                        },
                      })
                    );
                  }}
                >
                  {pageNum}
                </Button>
                {pageIdx < source.page_numbers.length - 1 ? ", " : ""}
              </React.Fragment>
            ))}
          </div>
        </div>
      ));
    },
  },
];