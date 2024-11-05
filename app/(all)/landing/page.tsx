// import ProgressComponent from "@/components/ProgressComponent";
// import { getXataClient } from "@/src/xata";

// const xata = getXataClient();

// async function getCaseData(id: string) {
//   const record = await xata.db.timeline_Job_Queue.read(id);
//   if (!record || typeof record.CaseName !== "string") {
//     throw new Error("Case not found");
//   }
//   return {
//     name: record.CaseName,
//   };
// }

// export default async function TimelineProgress({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { name } = await getCaseData(params.id);

//   return <ProgressComponent caseid={params.id} name={name} />;
// }
