// import TimelineTable from "@/components/TableComponent";
// import { FileUrls } from "@/src/types";
// import { getXataClient } from "@/src/xata";
// import axios from "axios";

// const xata = getXataClient();

// async function getCaseTimeline(id: string) {
//   try {
//     const record = await xata.db.timeline_Job_Queue.read(id);

//     if (!record || typeof record.Timeline_url !== "string") {
//       throw new Error("Invalid record, Timeline URL, or workspace");
//     }
//     const response = await axios.get(record.Timeline_url);

//     const fileRecords = await xata.db.timeline_files_data
//       .filter({
//         "workspace.id": id,
//       })
//       .getAll();

//     const fileUrls: FileUrls = {};

//     fileRecords.forEach((file) => {
//       if (file.file_name && file.file_url) {
//         fileUrls[file.file_name] = file.file_url;
//       }
//     });

//     return {
//       pdfUrls: fileUrls,
//       events: response.data.events,
//     };
//   } catch (error) {
//     console.error("Error fetching timeline:", error);
//     throw error;
//   }
// }

// export default async function Timeline({ params }: { params: { id: string } }) {
//   const { events, pdfUrls } = await getCaseTimeline(params.id);

//   return <TimelineTable data={events} pdfUrls={pdfUrls} />;
// }
