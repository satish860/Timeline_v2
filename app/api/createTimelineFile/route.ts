import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

const xata = getXataClient();

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const file_name = body.filename;
    const file_url = body.fileUrl;

    const record = await xata.db.timeline_files_data.create({
      file_url: file_url,
      file_name: file_name,
    });

    return NextResponse.json({ fileId: record.id }, { status: 201 });
  } catch (error) {
    console.error("Error updating file data record:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
