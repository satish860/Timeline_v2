import { serve } from "@upstash/workflow/nextjs";
import { GoogleAuth } from "google-auth-library";
import { getXataClient } from "@/src/xata";

const xata = getXataClient();

const cred_string = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

const auth = new GoogleAuth({
  credentials: JSON.parse(cred_string || "{}"),
});

type InitialPayload = {
  id: string;
  workspace_id: string;
};

export const { POST } = serve<InitialPayload>(async (context) => {
  const payload: InitialPayload = context.requestPayload;
  const extract_url = process.env.EXTRACT_URL || "";
  const segment_url = process.env.SEGMENT_URL || "";
  const combine_url = process.env.COMBINE_URL || "";

  const record_id = payload.id;
  const workspace_id = payload.workspace_id;

  const postData = {
    record_id: record_id,
    workspace_id: workspace_id,
  };

  const client = await auth.getIdTokenClient(extract_url);
  const token = await client.idTokenProvider.fetchIdToken(extract_url);

  const response = await context.call("Extraction call", {
    url: extract_url,
    method: "POST",
    body: postData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    console.log("Initial step is done");
  } else {
    console.log("Extraction step failed");
    return;
  }

  const segmentClient = await auth.getIdTokenClient(segment_url);
  const segmentToken = await segmentClient.idTokenProvider.fetchIdToken(
    segment_url
  );

  const segmentResponse = await context.call("Segmentation call", {
    url: segment_url,
    method: "POST",
    body: postData,
    headers: {
      Authorization: `Bearer ${segmentToken}`,
    },
  });

  if (segmentResponse.status === 200) {
    console.log("Segmentation step is done");
  } else {
    console.log("Segmentation step failed");
    return;
  }

  const records = await xata.db.timeline_files_data
    .select(["file_url", "file_name", "Timeline_url", "Status"])
    .filter({ workspace: { id: payload.workspace_id } })
    .getAll();

  if (
    records.length === 1 &&
    records[0].Timeline_url &&
    records[0].Status === "Timeline Created"
  ) {
    console.log("Single record case");
    await xata.db.timeline_Job_Queue.update(payload.workspace_id, {
      Timeline_url: records[0].Timeline_url,
      Status: "Completed",
    });
    console.log("Timeline URL updated");
  } else if (
    records.length > 1 &&
    records.every(
      (record) => record.Timeline_url && record.Status === "Timeline Created"
    )
  ) {
    console.log("Length of records: ", records.length);
    console.log("Multiple records with Timeline_url present.");

    const combineClient = await auth.getIdTokenClient(combine_url);
    const combineToken = await combineClient.idTokenProvider.fetchIdToken(
      combine_url
    );

    const combineResponse = await context.call("Combine call", {
      url: combine_url,
      method: "POST",
      body: postData,
      headers: {
        Authorization: `Bearer ${combineToken}`,
      },
    });
    console.log(combineResponse.body);
  } else {
    console.log("Unable to find Timeline URL");
  }
});
