import { DataTable } from "@/components/Table/data-table";
import { columns } from "@/components/TimelineTable/columns";
import axios from "axios";

async function getCaseTimeline(id: string) {
  console.log("id", id);
  const response = await axios.get(
    "https://pub-cc8438e664ef4d32a54c800c7c408282.r2.dev/69f37be3-5a84-41f3-8ec8-bcca35d54fc5.json"
  );
  return response.data.events;
}

export default async function Timeline({ params }: { params: { id: string } }) {
  const data = await getCaseTimeline(params.id);

  return <DataTable columns={columns} data={data} />;
}
