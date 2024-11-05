"use client";
import { DataTable } from "@/components/Table/data-table";
import { columns } from "@/components/Table/columns";
import { Case } from "@/components/Table/Schema";
import { useRouter } from "next/navigation";

interface CaseDataTableProps {
  data: Case[];
}

const CaseDataTable: React.FC<CaseDataTableProps> = ({ data }) => {
  const router = useRouter();

  const handleRowSelectionChange = 
  (data: Case) => {
      console.log(data);
      const id = data.id;
      if (data.status?.toLowerCase() === 'completed') {
          router.push(`/casetimeline/${id}`);
      } else if (data.status?.toLowerCase() === 'pending') {
          router.push(`/timelineprogress/${id}`);
      }
  }
  
  return (
    <DataTable
      data={data}
      columns={columns}
      placeholder="Filter by case..."
      columnName="caseTitle"
      onRowSelectionChange={handleRowSelectionChange}
    />
  );
};

export default CaseDataTable; 