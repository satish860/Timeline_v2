import { NextRequest, NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

export const runtime = "edge";
const xata = getXataClient();

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const name = request.caseName;
    const user_id = request.user_id;
    const user_name = request.user_name;
    const user_email = request.user_email;

    if (!request.caseName) {
      return NextResponse.json(
        { error: "Missing caseName field" },
        { status: 400 }
      );
    }

    const record = await xata.db.timeline_Job_Queue.create({
      CaseName: name,
      user_id: user_id,
      Status: "Pending",
      user_name: user_name,
      user_mail: user_email,
    });

    return NextResponse.json({ recId: record.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating case name data record:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
