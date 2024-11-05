export interface Source {
  file_name: string;
  page_numbers: number[];
}

export interface TimelineEvent {
  parsed_date: string;
  original_dates: string[];
  pages: number[];
  text: string[];
  event_found: boolean;
  event_heading: string;
  event: string;
  sources: Source[];
}

export interface FileUrls {
  [fileName: string]: string;
}