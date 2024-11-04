import TimelineTable from "@/components/TableComponent";
import { getXataClient } from "@/src/xata";
import axios from "axios";

const xata = getXataClient();

async function getCaseTimeline(id: string) {
  try {
    const record = await xata.db.timeline_files_data.read(id);

    if (!record || typeof record.Timeline_url !== "string") {
      throw new Error("Invalid record, Timeline URL, or workspace");
    }
    const response = await axios.get(record.Timeline_url);
    return {
      pdfUrl: record.file_url,
      events: response.data.events,
    };
  } catch (error) {
    console.error("Error fetching timeline:", error);
    throw error;
  }
}

export default async function Timeline({ params }: { params: { id: string } }) {
  const { events, pdfUrl } = await getCaseTimeline(params.id);

  return <TimelineTable data={events} pdfUrl={pdfUrl!} />;
}
