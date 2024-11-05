"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { ChartGantt } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  placeholder?: string;
  columnName: string;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
}

export function DataTable<TData extends { caseTitle?: string; status?: string; fileCount?: number; id?: string }, TValue>({
  columns,
  data,
  placeholder,
  columnName,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const router = useRouter();

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = React.useCallback(
    (updaterOrValue) => {
      const newSelection = 
        typeof updaterOrValue === 'function' 
          ? updaterOrValue(rowSelection)
          : updaterOrValue;

      setRowSelection(newSelection);

      if (onRowSelectionChange) {
        const selectedRows = Object.entries(newSelection)
          .filter(([, isSelected]) => isSelected)
          .map(([index]) => data[parseInt(index)])
          .filter((row): row is TData => row !== undefined);

        selectedRows.forEach(row => {
          console.log({
            caseId: row.id,
            caseTitle: row.caseTitle,
            status: row.status,
            fileCount: row.fileCount,
          });
        });
        
        onRowSelectionChange(selectedRows);
      }
    },
    [data, onRowSelectionChange, rowSelection]
  );

  const handleRowClick = React.useCallback(
    (index: number) => {
      const clickedRow = data[index];
      console.log('Selected Row Details:', {
        caseId: clickedRow.id,
        caseTitle: clickedRow.caseTitle,
        status: clickedRow.status,
        fileCount: clickedRow.fileCount
      });
      
      const id = clickedRow.id;
      console.log("id=",id);
      if (clickedRow.status?.toLowerCase() === 'completed') {
        router.push(`/casetimeline/${id}`);
      } else if (clickedRow.status?.toLowerCase() === 'pending') {
        router.push(`/timelineprogress/${id}`);
      }

      const newSelection = { ...rowSelection };
      newSelection[index] = !newSelection[index];
      handleRowSelectionChange(newSelection);
    },
    [data, rowSelection, handleRowSelectionChange]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleClick(): void {
    router.push("/newtimeline");
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <DataTableToolbar
        table={table}
        placeholder={placeholder}
        columnName={columnName}
      />
      <div className="flex-1 overflow-hidden rounded-md border">
        <div className="h-full overflow-auto custom-scrollbar">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(row.index)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <h1 className="text-2xl font-bold text-gray-600 mb-4">
                      Start Your Case Timeline Journey
                    </h1>
                    <p className="text-gray-500 mb-6">
                      Create a new timeline to organize and visualize your case
                      events
                    </p>
                    <Button onClick={handleClick} className="mt-2">
                      <ChartGantt className="mr-2" /> New Timeline
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
