"use client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { statuses } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { FileDown } from "lucide-react";
import axios from "axios";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  placeholder?: string;
  columnName: string;
  id?: string;
}

export function DataTableToolbar<TData>({
  table,
  placeholder,
  columnName,
  id,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const wordCreationUrl = process.env.NEXT_PUBLIC_WORD_CREATION_URL;

  const handleDownloadWord = async () => {
    console.log("Downloading word for id:", id);
    const response = await axios
      .get(`${wordCreationUrl}?workspace_id=${id}`)
      .then((response) => {
        if (response.data.doc_url) {
          window.open(response.data.url, "_blank");
        }
      })
      .catch((error) => {
        console.error("Error downloading word document:", error);
      });
    console.log(response);
  };

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          type="text"
          value={
            (table.getColumn(columnName)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(columnName)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {columnName === "event" && (
          <Button variant="outline" size="sm" onClick={handleDownloadWord}>
            <FileDown className="mr-2 h-4 w-4" />
            Download Word
          </Button>
        )}
        {columnName !== "event" && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
