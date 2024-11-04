import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

const xata = getXataClient();

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const workspace_id = body.workspace_id;

    const workspace_record = await xata.db.timeline_Job_Queue.read(
      workspace_id
    );

    const workspace_status = {
      workspace_id: workspace_record?.id,
      workspace_url: workspace_record?.CaseName,
      status: workspace_record?.Status
    }
    
    const records = await xata.db.timeline_files_data
      .select(["file_url", "file_name", "Timeline_url", "Status"])
      .filter({ workspace: { id: workspace_id } })
      .getAll();

    const file_statuses = records.map(record => ({
      file_id: record.id,
      file_name: record.file_name,
      status: record.Status
    }));

    return NextResponse.json({ 
      "workspace_status": workspace_status,
      "file_statuses": file_statuses
    }, { status: 200 });
  } catch (error) {
    console.error("Error checking status:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
