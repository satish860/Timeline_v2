import { columns } from "@/components/Table/columns";
import { Case, CaseSchema, statusEnum } from "@/components/Table/Schema";
import { stackServerApp } from "@/stack";
import { getXataClient } from "@/src/xata";
import { z } from "zod"
import CaseDataTable from "@/app/CaseDataTable";

const fetchCases = async (user_id: string): Promise<Case[]> => {
  const xata = getXataClient();

  try {
    const records = await xata.db.timeline_Job_Queue
      .select([
        "id",
        "CaseName",
        "Status",
        "user_id"
      ])
      .filter({ "user_id": user_id })
      .getAll();

      const casesWithFiles = await Promise.all(
        records.map(async (record) => {
          const workspaceId = record.id;
          let fileCount = 0;
  
          if (workspaceId) {
            try {
              const files = await xata.db.timeline_files_data
                .filter({ "workspace.id": workspaceId })
                .getAll();
              
              fileCount = files.length;
            } catch (error) {
              console.error(`Error fetching files for workspace ${workspaceId}:`, error);
            }
          }
  
          type StatusType = z.infer<typeof statusEnum>;
          const status = record.Status?.toLowerCase() as StatusType ?? "pending";
  
          const caseData: Case = {
            id: record.id ?? "",
            caseTitle: record.CaseName ?? "Untitled Case",
            status: status,
            label: record.CaseName ?? "Untitled Case",
            shareList: [],
            fileCount: fileCount
          };
  
          return caseData;
        })
      );

    const validCases = casesWithFiles.filter(caseData => {
      const result = CaseSchema.safeParse(caseData);
      return result.success;
    });

    return validCases;
  } catch (error) {
    console.error("Error fetching cases:", error);
    return [];
  }
};

export default async function Home() {
  const user = await stackServerApp.getUser({ or: 'redirect' });
  const user_id = user.id;

  const cases = await fetchCases(user_id);

  

  console.log("cases", cases);
  const data = cases;

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome {user.displayName} !
          </h2>
          <p className="text-muted-foreground">
            You are all set to start your day.
          </p>
        </div>
        <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
      </div>
      <div className="flex-1 overflow-hidden">
        <CaseDataTable data={data} />
      </div>
    </div>
  );
}
