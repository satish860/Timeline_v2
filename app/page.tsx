import { columns } from "@/components/Table/columns";
import { DataTable } from "@/components/Table/data-table";
import { Case } from "@/components/Table/Schema";

export default function Home() {
  const data: Case[] = [
    { id: "1", caseTitle: "Case 1", status: "in progress", priority: "medium", label: "Case 1", shareList: ["Satish", "Rajesh"] },
    { id: "2", caseTitle: "Case 2", status: "in progress", priority: "medium", label: "Case 2", shareList: ["Satish", "Rajesh"] },
    { id: "3", caseTitle: "Case 3", status: "in progress", priority: "medium", label: "Case 3", shareList: ["Satish", "Rajesh"] },
  ];

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome Satish !</h2>
            <p className="text-muted-foreground">
              You are all set to start your day.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <UserNav /> */}
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <DataTable data={data} columns={columns} />
        </div>
      </div>
  );
}
