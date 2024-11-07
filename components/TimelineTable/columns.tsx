"use client";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { DataTableColumnHeader } from "@/components/Table/data-table-column-header";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { EllipsisVertical, Trash } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

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
  {
    id: "actions",
    cell: ({ row }) => {
      const handleDelete = () => {
        window.dispatchEvent(
          new CustomEvent("deleteTimelineEvent", {
            detail: {
              rowId: row.id,
              event: row.original,
            },
          })
        )
        console.log("test delete",row)
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the timeline event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={(e) => {
                      handleDelete();
                    }} 
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];