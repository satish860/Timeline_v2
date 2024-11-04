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

  const postData = {
    record_id: payload.id,
    workspace_id: payload.workspace_id,
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

  console.log("initial step is done");
  console.log(response.body);

  if (!response) {
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

  console.log("Segmentation step is done");
  console.log(segmentResponse.body);

  const records = await xata.db.timeline_files_data
    .select(["file_url", "file_name", "Timeline_url"])
    .filter({ workspace: { id: payload.workspace_id } })
    .getAll();

  if (records.length === 1 && records[0].Timeline_url) {
    console.log("Single record case");
    const UpdateTimeline = await xata.db.timeline_Job_Queue.update(
      payload.workspace_id,
      {
        Timeline_url: records[0].Timeline_url,
      }
    );
    console.log(UpdateTimeline);
  } else if (
    records.length > 1 &&
    records.every((record) => record.Timeline_url)
  ) {
    console.log("Length of records: ", records.length);
    console.log("Multiple records with Timeline_url present");

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
    console.log("No records with Timeline_url present");
  }
});
