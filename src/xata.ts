// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "workspace",
    columns: [
      { name: "workspace_name", type: "string" },
      { name: "user_id", type: "string" },
      { name: "user_mail", type: "string" },
      { name: "combined_md_url", type: "string" },
      { name: "TokenCount", type: "int" },
      { name: "Timeline_url", type: "string" },
      { name: "Summary_url", type: "string" },
      { name: "user_name", type: "string" },
      { name: "Timeline_pdf", type: "text" },
    ],
    revLinks: [{ column: "workspace", table: "fileData" }],
  },
  {
    name: "fileData",
    columns: [
      { name: "file_name", type: "string" },
      { name: "url", type: "string" },
      { name: "md_url", type: "string" },
      { name: "workspace", type: "link", link: { table: "workspace" } },
      { name: "pdf_url", type: "string" },
      { name: "is_ocr_need", type: "bool" },
      { name: "word_url", type: "string" },
      { name: "file_type", type: "string" },
    ],
  },
  {
    name: "Userdata",
    columns: [
      { name: "Username", type: "string" },
      { name: "Companyname", type: "string" },
      { name: "Usermail", type: "email" },
    ],
    revLinks: [{ column: "user", table: "ChatData" }],
  },
  {
    name: "ChatData",
    columns: [
      { name: "chat_id", type: "string" },
      { name: "chat", type: "json" },
      { name: "user", type: "link", link: { table: "Userdata" } },
      { name: "chat_title", type: "string" },
    ],
  },
  {
    name: "workspaceChatTable",
    columns: [
      { name: "workspace_id", type: "string" },
      { name: "chat_title", type: "string" },
      { name: "chat_history", type: "json" },
    ],
  },
  {
    name: "summaries",
    columns: [
      { name: "newsletter", type: "string" },
      { name: "workspaceId", type: "string" },
      { name: "irac", type: "string" },
      { name: "brief", type: "string" },
      { name: "layman", type: "string" },
    ],
  },
  {
    name: "notes",
    columns: [
      { name: "workspaceId", type: "string" },
      { name: "notes", type: "json" },
    ],
  },
  {
    name: "research",
    columns: [
      { name: "user_mail", type: "text" },
      { name: "research_name", type: "text" },
      { name: "folder_name", type: "text" },
      { name: "total_files", type: "int" },
    ],
  },
  {
    name: "folderData",
    columns: [
      { name: "research_id", type: "text" },
      { name: "file_name", type: "text" },
      { name: "file_url", type: "text" },
    ],
  },
  {
    name: "Kyc",
    columns: [
      { name: "Name", type: "text" },
      { name: "Workplace", type: "text" },
      { name: "Practice", type: "text" },
      { name: "Role", type: "text" },
      { name: "Useremail", type: "text" },
      { name: "Userid", type: "text" },
      { name: "Kycflag", type: "bool", defaultValue: "true" },
    ],
  },
  {
    name: "timeline_files_data",
    columns: [
      { name: "file_url", type: "text" },
      { name: "file_name", type: "text" },
      { name: "total_pages", type: "int" },
      { name: "workspace_id", type: "text" },
      { name: "combined_text_url", type: "text" },
      { name: "Timeline_url", type: "text" },
      { name: "Case_Notes_Url", type: "text" },
      {
        name: "workspace",
        type: "link",
        link: { table: "timeline_Job_Queue" },
      },
      { name: "file_description", type: "text" },
      { name: "file_order", type: "int" },
      { name: "Status", type: "text" },
    ],
  },
  {
    name: "timeline_file_split_data",
    columns: [
      { name: "file_id", type: "text" },
      { name: "start_page", type: "int" },
      { name: "end_page", type: "int" },
      { name: "text_file_url", type: "text" },
      { name: "file_name", type: "text" },
      { name: "workspace_id", type: "text" },
    ],
  },
  {
    name: "timeline_Job_Queue",
    columns: [
      { name: "workspace_id", type: "text" },
      { name: "event_list_url", type: "text" },
      { name: "date_list_url", type: "text" },
      { name: "Timeline_url", type: "text" },
      { name: "Case_Notes_Url", type: "text" },
      { name: "user_id", type: "text" },
      { name: "CaseName", type: "text" },
      { name: "Status", type: "text" },
      { name: "user_mail", type: "text" },
      { name: "user_name", type: "text" },
    ],
    revLinks: [{ column: "workspace", table: "timeline_files_data" }],
  },
  {
    name: "podcast_samples",
    columns: [
      { name: "title", type: "text" },
      { name: "category", type: "text" },
      { name: "pdf_url", type: "text" },
      { name: "summary", type: "text" },
      { name: "transcript_url", type: "text" },
      { name: "audio_url", type: "text" },
      { name: "poster_url", type: "text" },
    ],
  },
  { name: "timeline_delete", columns: [{ name: "CaseName", type: "text" }] },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Workspace = InferredTypes["workspace"];
export type WorkspaceRecord = Workspace & XataRecord;

export type FileData = InferredTypes["fileData"];
export type FileDataRecord = FileData & XataRecord;

export type Userdata = InferredTypes["Userdata"];
export type UserdataRecord = Userdata & XataRecord;

export type ChatData = InferredTypes["ChatData"];
export type ChatDataRecord = ChatData & XataRecord;

export type WorkspaceChatTable = InferredTypes["workspaceChatTable"];
export type WorkspaceChatTableRecord = WorkspaceChatTable & XataRecord;

export type Summaries = InferredTypes["summaries"];
export type SummariesRecord = Summaries & XataRecord;

export type Notes = InferredTypes["notes"];
export type NotesRecord = Notes & XataRecord;

export type Research = InferredTypes["research"];
export type ResearchRecord = Research & XataRecord;

export type FolderData = InferredTypes["folderData"];
export type FolderDataRecord = FolderData & XataRecord;

export type Kyc = InferredTypes["Kyc"];
export type KycRecord = Kyc & XataRecord;

export type TimelineFilesData = InferredTypes["timeline_files_data"];
export type TimelineFilesDataRecord = TimelineFilesData & XataRecord;

export type TimelineFileSplitData = InferredTypes["timeline_file_split_data"];
export type TimelineFileSplitDataRecord = TimelineFileSplitData & XataRecord;

export type TimelineJobQueue = InferredTypes["timeline_Job_Queue"];
export type TimelineJobQueueRecord = TimelineJobQueue & XataRecord;

export type PodcastSamples = InferredTypes["podcast_samples"];
export type PodcastSamplesRecord = PodcastSamples & XataRecord;

export type TimelineDelete = InferredTypes["timeline_delete"];
export type TimelineDeleteRecord = TimelineDelete & XataRecord;

export type DatabaseSchema = {
  workspace: WorkspaceRecord;
  fileData: FileDataRecord;
  Userdata: UserdataRecord;
  ChatData: ChatDataRecord;
  workspaceChatTable: WorkspaceChatTableRecord;
  summaries: SummariesRecord;
  notes: NotesRecord;
  research: ResearchRecord;
  folderData: FolderDataRecord;
  Kyc: KycRecord;
  timeline_files_data: TimelineFilesDataRecord;
  timeline_file_split_data: TimelineFileSplitDataRecord;
  timeline_Job_Queue: TimelineJobQueueRecord;
  podcast_samples: PodcastSamplesRecord;
  timeline_delete: TimelineDeleteRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Poorna-Prakash-s-workspace-g2an37.us-east-1.xata.sh/db/RagDatabase",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
